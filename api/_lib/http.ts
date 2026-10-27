import type { IncomingMessage, ServerResponse } from 'node:http';

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

type Handler = (req: IncomingMessage, res: ServerResponse, url: URL) => Promise<unknown>;

const SAFE_METHODS = new Set(['GET', 'HEAD']);

/** Rejects state-changing requests that come from another site (browsers always send Origin on these). */
function assertSameOrigin(req: IncomingMessage) {
  const origin = req.headers.origin;
  if (!origin) return;
  let host: string;
  try {
    host = new URL(origin).host;
  } catch {
    throw new HttpError(403, 'Forbidden');
  }
  const expected = (req.headers['x-forwarded-host'] as string | undefined) ?? req.headers.host;
  if (host !== expected) throw new HttpError(403, 'Forbidden');
}

function assertJsonBody(req: IncomingMessage) {
  const length = Number(req.headers['content-length'] ?? 0);
  const type = req.headers['content-type'] ?? '';
  if (length > 0 && !type.startsWith('application/json')) throw new HttpError(415, 'Expected application/json');
}

/** Best-effort client IP for rate limiting (Vercel sets x-forwarded-for / x-real-ip). */
export function clientIp(req: IncomingMessage) {
  const forwarded = (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim();
  return forwarded || (req.headers['x-real-ip'] as string | undefined) || req.socket?.remoteAddress || 'unknown';
}

/**
 * Wraps a route: restricts methods, blocks cross-site writes, and turns errors into JSON responses
 * without leaking internals. Works on Vercel and in the Vite dev server.
 */
export function route(methods: Record<string, Handler>) {
  return async (req: IncomingMessage, res: ServerResponse) => {
    const url = new URL(req.url ?? '/', 'http://localhost');
    const method = req.method ?? 'GET';
    const fn = methods[method];
    try {
      if (!fn) {
        res.setHeader('Allow', Object.keys(methods).join(', '));
        throw new HttpError(405, 'Method not allowed');
      }
      if (!SAFE_METHODS.has(method)) {
        assertSameOrigin(req);
        assertJsonBody(req);
      }
      const data = await fn(req, res, url);
      if (!res.writableEnded) send(res, 200, data ?? { ok: true });
    } catch (err) {
      const known = err instanceof HttpError;
      if (!known) console.error(err);
      if (!res.writableEnded) send(res, known ? err.status : 500, { error: known ? err.message : 'Something went wrong. Please try again.' });
    }
  };
}

export function send(res: ServerResponse, status: number, data: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
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
  if (!value) {
    console.error(`${name} is not set`);
    throw new HttpError(500, 'Server is not configured');
  }
  return value;
}
