import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { HttpError, requireEnv } from './http.js';

const COOKIE = 'admin_session';
const MAX_AGE = 60 * 60 * 24 * 7;

const sign = (payload: string) => createHmac('sha256', requireEnv('SESSION_SECRET')).update(payload).digest('base64url');

function safeEqual(a: string, b: string) {
  // Hash first so the comparison is constant-time regardless of length.
  const ha = createHash('sha256').update(a).digest();
  const hb = createHash('sha256').update(b).digest();
  return timingSafeEqual(ha, hb);
}

export function passwordMatches(password: string) {
  return safeEqual(password, requireEnv('ADMIN_PASSWORD'));
}

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
  return `Path=/; HttpOnly; SameSite=Strict${local ? '' : '; Secure'}`;
}

export function startSession(req: IncomingMessage, res: ServerResponse) {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + MAX_AGE * 1000 })).toString('base64url');
  res.setHeader('Set-Cookie', `${COOKIE}=${payload}.${sign(payload)}; Max-Age=${MAX_AGE}; ${cookieAttributes(req)}`);
}

export function endSession(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Set-Cookie', `${COOKIE}=; Max-Age=0; ${cookieAttributes(req)}`);
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
