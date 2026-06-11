import crypto from 'node:crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';

type ResumeRow = {
  content: unknown;
  updated_at: string;
};

type NeonResult<T> = {
  rows: T[];
};

const ADMIN_TOKEN_MAX_AGE_MS = 1000 * 60 * 60 * 12;

const getDatabaseEndpoint = (databaseUrl: string) => {
  const url = new URL(databaseUrl);
  const apiHost = url.hostname.replace(/^[^.]+\./, 'api.');

  return `https://${apiHost}/sql`;
};

const query = async <T>(sql: string, params: unknown[] = []) => {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error('Database is not configured');
  }

  const response = await fetch(getDatabaseEndpoint(databaseUrl), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Neon-Connection-String': databaseUrl
    },
    body: JSON.stringify({ query: sql, params })
  });
  const result = await response.json() as NeonResult<T> & { message?: string; error?: string };

  if (!response.ok) {
    throw new Error(result.message || result.error || `Database request failed with ${response.status}`);
  }

  return result;
};

const ensureResumeTable = async () => {
  await query(`
    create table if not exists portfolio_resume_content (
      id integer primary key default 1,
      content jsonb not null,
      updated_at timestamptz not null default now(),
      constraint one_resume_row check (id = 1)
    )
  `);
};

const getTokenPayload = (token: string) => {
  const [payload, signature] = token.split('.');
  const secret = process.env.ADMIN_PASSWORD;

  if (!payload || !signature || !secret) {
    return null;
  }

  const expectedSignature = crypto.createHmac('sha256', secret).update(payload).digest('base64url');

  if (signature.length !== expectedSignature.length) {
    return null;
  }

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return null;
  }

  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { exp?: number };
  } catch {
    return null;
  }
};

const isAuthorized = (request: VercelRequest) => {
  const header = request.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice('Bearer '.length) : '';
  const payload = getTokenPayload(token);

  return Boolean(payload?.exp && payload.exp > Date.now() && payload.exp - Date.now() <= ADMIN_TOKEN_MAX_AGE_MS);
};

const readString = (value: unknown) => typeof value === 'string' ? value.trim() : '';

const readItems = <T>(value: unknown, mapper: (item: Record<string, unknown>) => T | null) =>
  Array.isArray(value)
    ? value.map(item => mapper(item && typeof item === 'object' ? item as Record<string, unknown> : {})).filter(Boolean) as T[]
    : [];

const readResumePayload = (body: Record<string, unknown>) => ({
  resumeUrl: readString(body.resumeUrl) || undefined,
  education: readItems(body.education, item => {
    const degree = readString(item.degree);
    const institution = readString(item.institution);
    const period = readString(item.period);
    const status = readString(item.status);
    return degree && institution ? { degree, institution, period, status } : null;
  }),
  experience: readItems(body.experience, item => {
    const position = readString(item.position);
    const company = readString(item.company);
    const period = readString(item.period);
    const description = readString(item.description);
    return position && company ? { position, company, period, description } : null;
  }),
  keySkills: Array.isArray(body.keySkills) ? body.keySkills.map(readString).filter(Boolean) : [],
  certifications: readItems(body.certifications, item => {
    const name = readString(item.name);
    const issuer = readString(item.issuer);
    const year = readString(item.year);
    const url = readString(item.url);
    return name && issuer ? { name, issuer, year, ...(url ? { url } : {}) } : null;
  })
});

export default async function handler(request: VercelRequest, response: VercelResponse) {
  try {
    await ensureResumeTable();

    if (request.method === 'GET') {
      const result = await query<ResumeRow>('select content, updated_at from portfolio_resume_content where id = 1');
      response.status(200).json({ resume: result.rows[0]?.content ?? null });
      return;
    }

    if (request.method !== 'PUT') {
      response.status(405).json({ error: 'Method not allowed' });
      return;
    }

    if (!isAuthorized(request)) {
      response.status(401).json({ error: 'Admin authorization is required' });
      return;
    }

    const payload = readResumePayload(request.body ?? {});

    await query(`
      insert into portfolio_resume_content (id, content, updated_at)
      values (1, $1::jsonb, now())
      on conflict (id) do update set content = excluded.content, updated_at = now()
    `, [JSON.stringify(payload)]);

    response.status(200).json({ resume: payload });
  } catch (error) {
    response.status(500).json({ error: error instanceof Error ? error.message : 'Resume API failed' });
  }
}
