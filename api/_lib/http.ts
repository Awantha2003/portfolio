import type { IncomingMessage, ServerResponse } from 'node:http';

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

type Handler = (req: IncomingMessage, res: ServerResponse, url: URL) => Promise<unknown>;

/** Wraps a route: restricts methods, turns thrown HttpErrors into JSON responses. Works on Vercel and in the Vite dev server. */
export function route(methods: Record<string, Handler>) {
  return async (req: IncomingMessage, res: ServerResponse) => {
    const url = new URL(req.url ?? '/', 'http://localhost');
    const fn = methods[req.method ?? 'GET'];
    try {
      if (!fn) throw new HttpError(405, 'Method not allowed');
      const data = await fn(req, res, url);
      if (!res.writableEnded) send(res, 200, data ?? { ok: true });
    } catch (err) {
      const status = err instanceof HttpError ? err.status : 500;
      if (status === 500) console.error(err);
      const message = err instanceof Error ? err.message : 'Server error';
      if (!res.writableEnded) send(res, status, { error: message });
    }
  };
}

export function send(res: ServerResponse, status: number, data: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(data));
}

const MAX_BODY = 2 * 1024 * 1024;

export async function readJson(req: IncomingMessage): Promise<Record<string, unknown>> {
  // Vercel parses JSON bodies itself; the Vite dev server leaves the stream for us.
  let preParsed: unknown;
  try {
    preParsed = (req as IncomingMessage & { body?: unknown }).body;
  } catch {
    throw new HttpError(400, 'Invalid JSON body');
  }
  if (preParsed !== undefined) {
    return typeof preParsed === 'string' ? JSON.parse(preParsed) : preParsed as Record<string, unknown>;
  }
  let size = 0;
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY) throw new HttpError(413, 'Request body too large');
    chunks.push(chunk as Buffer);
  }
  if (chunks.length === 0) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw new HttpError(400, 'Invalid JSON body');
  }
}

export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new HttpError(500, `${name} is not set on the server`);
  return value;
}
