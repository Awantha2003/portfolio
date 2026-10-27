import { createHash, createHmac, scryptSync, timingSafeEqual } from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { HttpError, requireEnv } from './http.js';

const COOKIE = 'admin_session';
const MAX_AGE = 60 * 60 * 12; // 12 hours

function safeEqual(a: string | Buffer, b: string | Buffer) {
  // Hash first so the comparison is constant-time regardless of length.
  const ha = createHash('sha256').update(a).digest();
  const hb = createHash('sha256').update(b).digest();
  return timingSafeEqual(ha, hb);
}

/** The stored credential: a scrypt hash (preferred) or, for local setups, the plain password. */
function credential() {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (hash) return { kind: 'hash' as const, value: hash };
  return { kind: 'plain' as const, value: requireEnv('ADMIN_PASSWORD') };
}

export function passwordMatches(password: string) {
  const cred = credential();
  if (cred.kind === 'plain') return safeEqual(password, cred.value);
  // Format: scrypt:<salt base64>:<hash base64>  (see scripts/hash-password.mjs)
  const [scheme, salt, expected] = cred.value.split(':');
  if (scheme !== 'scrypt' || !salt || !expected) throw new HttpError(500, 'Server is not configured');
  const actual = scryptSync(password, Buffer.from(salt, 'base64'), 64, { N: 16384, r: 8, p: 1 });
  return safeEqual(actual, Buffer.from(expected, 'base64'));
}

function sessionKey() {
  const secret = requireEnv('SESSION_SECRET');
  if (secret.length < 32) {
    console.error('SESSION_SECRET must be at least 32 characters');
    throw new HttpError(500, 'Server is not configured');
  }
  // Mixing in the credential means changing the password signs every existing session out.
  return createHash('sha256').update(secret).update(credential().value).digest();
}

const sign = (payload: string) => createHmac('sha256', sessionKey()).update(payload).digest('base64url');

function readCookie(req: IncomingMessage, name: string) {
  const header = req.headers.cookie ?? '';
  for (const part of header.split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return decodeURIComponent(v.join('='));
  }
  return undefined;
}

function cookieAttributes(req: IncomingMessage) {
  const host = req.headers.host ?? '';
  const local = host.startsWith('localhost') || host.startsWith('127.0.0.1');
  // Only the API needs the cookie; HttpOnly keeps it away from page scripts.
  return `Path=/api; HttpOnly; SameSite=Strict${local ? '' : '; Secure'}`;
}

export function startSession(req: IncomingMessage, res: ServerResponse) {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + MAX_AGE * 1000 })).toString('base64url');
  res.setHeader('Set-Cookie', `${COOKIE}=${payload}.${sign(payload)}; Max-Age=${MAX_AGE}; ${cookieAttributes(req)}`);
}

export function endSession(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Set-Cookie', [
  `${COOKIE}=; Max-Age=0; ${cookieAttributes(req)}`,
  // Clear the cookie from older builds, which used Path=/.
  `${COOKIE}=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict`]
  );
}

export function isAdmin(req: IncomingMessage) {
  const token = readCookie(req, COOKIE);
  if (!token) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature || !safeEqual(signature, sign(payload))) return false;
  try {
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return typeof exp === 'number' && exp > Date.now();
  } catch {
    return false;
  }
}

export function requireAdmin(req: IncomingMessage) {
  if (!isAdmin(req)) throw new HttpError(401, 'Not signed in');
}
