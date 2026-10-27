import { HttpError, requireEnv } from './http.js';

/**
 * Runs one SQL statement on Neon over its HTTPS endpoint (the same one @neondatabase/serverless uses),
 * so the API needs no database driver. Every value comes back as text.
 */
export async function sql(query: string, params: string[] = []): Promise<Record<string, string | null>[]> {
  const connection = requireEnv('DATABASE_URL');
  let host: string;
  try {
    host = new URL(connection).hostname;
  } catch {
    throw new HttpError(500, 'DATABASE_URL is not a valid connection string');
  }
  // ep-xxx.region.aws.neon.tech → api.region.aws.neon.tech, as the official driver does.
  const res = await fetch(`https://${host.replace(/^[^.]+\./, 'api.')}/sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Neon-Connection-String': connection,
      'Neon-Raw-Text-Output': 'true',
      'Neon-Array-Mode': 'false'
    },
    body: JSON.stringify({ query, params })
  });
  const body = await res.json().catch(() => ({})) as { rows?: Record<string, string | null>[]; message?: string; };
  if (!res.ok) throw new Error(`Database error: ${body.message ?? res.status}`);
  return body.rows ?? [];
}

let ready: Promise<unknown> | undefined;

/** Creates the tables on first use, once per server instance. */
export function ensureSchema() {
  ready ??= (async () => {
    await sql(`create table if not exists site_content (
      key text primary key,
      data jsonb not null,
      updated_at timestamptz not null default now()
    )`);
    await sql(`create table if not exists login_attempts (
      ip text not null,
      at timestamptz not null default now()
    )`);
    await sql('create index if not exists login_attempts_ip_at on login_attempts (ip, at)');
  })().catch((err) => {
    ready = undefined;
    throw err;
  });
  return ready;
}
