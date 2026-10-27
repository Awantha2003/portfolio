import { ensureSchema, sql } from './db.js';
import { HttpError } from './http.js';

const WINDOW = '15 minutes';
const PER_IP = 5;
const GLOBAL = 30;

/**
 * Login brute-force protection, stored in Postgres so it holds across serverless instances:
 * at most 5 failed attempts per IP and 30 overall in any 15 minutes.
 */
export async function assertLoginAllowed(ip: string) {
  await ensureSchema();
  const [row] = await sql(
    `select count(*) filter (where ip = $1)::text as mine, count(*)::text as total
       from login_attempts where at > now() - interval '${WINDOW}'`,
    [ip]
  );
  if (Number(row?.mine) >= PER_IP || Number(row?.total) >= GLOBAL) {
    throw new HttpError(429, 'Too many attempts. Try again in 15 minutes.');
  }
}

export async function recordFailedLogin(ip: string) {
  await sql('insert into login_attempts (ip) values ($1)', [ip]);
  await sql("delete from login_attempts where at < now() - interval '1 day'");
}

export async function clearFailedLogins(ip: string) {
  await sql('delete from login_attempts where ip = $1', [ip]);
}
