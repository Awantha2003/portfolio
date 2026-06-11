import crypto from 'node:crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';

type ProjectRow = {
  id: string | number;
  title: string;
  description: string;
  image: string;
  category: string[];
  stack: string[];
  live_url: string | null;
  github_url: string | null;
  figma_url: string | null;
  pinned: boolean | null;
  created_at: string;
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

const ensureProjectsTable = async () => {
  await query(`
    create table if not exists portfolio_projects (
      id bigserial primary key,
      title text not null,
      description text not null,
      image text not null,
      category text[] not null default '{}',
      stack text[] not null default '{}',
      live_url text,
      github_url text,
      figma_url text,
      pinned boolean not null default false,
      source text not null default 'admin',
      created_at timestamptz not null default now()
    )
  `);
  await query('alter table portfolio_projects add column if not exists pinned boolean not null default false');
};

const mapProject = (row: ProjectRow) => ({
  id: Number(row.id),
  title: row.title,
  description: row.description,
  image: row.image,
  category: row.category,
  stack: row.stack,
  liveUrl: row.live_url || undefined,
  githubUrl: row.github_url || undefined,
  FigmaUrl: row.figma_url || undefined,
  pinned: Boolean(row.pinned),
  source: 'admin' as const,
  createdAt: row.created_at
});

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

const readStringArray = (value: unknown) =>
  Array.isArray(value)
    ? value.map(item => readString(item)).filter(Boolean)
    : [];

const readProjectPayload = (body: Record<string, unknown>) => ({
  title: readString(body.title),
  description: readString(body.description),
  image: readString(body.image),
  category: readStringArray(body.category),
  stack: readStringArray(body.stack),
  liveUrl: readString(body.liveUrl) || null,
  githubUrl: readString(body.githubUrl) || null,
  FigmaUrl: readString(body.FigmaUrl) || null,
  pinned: body.pinned === true
});

const validateProjectPayload = (payload: ReturnType<typeof readProjectPayload>) => {
  if (!payload.title || !payload.description || !payload.image) {
    return 'Project title, description, and image are required';
  }

  if (payload.category.length === 0) {
    return 'Choose at least one project category';
  }

  if (payload.stack.length === 0) {
    return 'Add at least one tech stack item';
  }

  return '';
};

export default async function handler(request: VercelRequest, response: VercelResponse) {
  try {
    await ensureProjectsTable();

    if (request.method === 'GET') {
      const result = await query<ProjectRow>(`
        select id, title, description, image, category, stack, live_url, github_url, figma_url, pinned, created_at
        from portfolio_projects
        order by pinned desc, created_at desc, id desc
      `);

      response.status(200).json({ projects: result.rows.map(mapProject) });
      return;
    }

    if (!isAuthorized(request)) {
      response.status(401).json({ error: 'Admin authorization is required' });
      return;
    }

    if (request.method === 'POST') {
      const payload = readProjectPayload(request.body ?? {});
      const validationError = validateProjectPayload(payload);

      if (validationError) {
        response.status(400).json({ error: validationError });
        return;
      }

      if (payload.pinned) {
        await query('update portfolio_projects set pinned = false');
      }

      const result = await query<ProjectRow>(`
        insert into portfolio_projects (title, description, image, category, stack, live_url, github_url, figma_url, pinned)
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        returning id, title, description, image, category, stack, live_url, github_url, figma_url, pinned, created_at
      `, [payload.title, payload.description, payload.image, payload.category, payload.stack, payload.liveUrl, payload.githubUrl, payload.FigmaUrl, payload.pinned]);

      response.status(201).json({ project: mapProject(result.rows[0]) });
      return;
    }

    if (request.method === 'PUT') {
      const projectId = Number(request.query.id);
      const payload = readProjectPayload(request.body ?? {});
      const validationError = validateProjectPayload(payload);

      if (!Number.isFinite(projectId)) {
        response.status(400).json({ error: 'A valid project id is required' });
        return;
      }

      if (validationError) {
        response.status(400).json({ error: validationError });
        return;
      }

      if (payload.pinned) {
        await query('update portfolio_projects set pinned = false where id <> $1', [projectId]);
      }

      const result = await query<ProjectRow>(`
        update portfolio_projects
        set title = $2,
            description = $3,
            image = $4,
            category = $5,
            stack = $6,
            live_url = $7,
            github_url = $8,
            figma_url = $9,
            pinned = $10
        where id = $1
        returning id, title, description, image, category, stack, live_url, github_url, figma_url, pinned, created_at
      `, [projectId, payload.title, payload.description, payload.image, payload.category, payload.stack, payload.liveUrl, payload.githubUrl, payload.FigmaUrl, payload.pinned]);

      if (!result.rows[0]) {
        response.status(404).json({ error: 'Project not found' });
        return;
      }

      response.status(200).json({ project: mapProject(result.rows[0]) });
      return;
    }

    if (request.method === 'DELETE') {
      if (request.query.all === 'true') {
        await query('delete from portfolio_projects');
        response.status(200).json({ ok: true });
        return;
      }

      const projectId = Number(request.query.id);

      if (!Number.isFinite(projectId)) {
        response.status(400).json({ error: 'A valid project id is required' });
        return;
      }

      await query('delete from portfolio_projects where id = $1', [projectId]);
      response.status(200).json({ ok: true });
      return;
    }

    response.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    response.status(500).json({ error: error instanceof Error ? error.message : 'Projects API failed' });
  }
}
