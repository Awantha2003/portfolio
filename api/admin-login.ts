import crypto from 'node:crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const createAdminToken = (email: string, secret: string) => {
  const payload = Buffer.from(JSON.stringify({
    email,
    exp: Date.now() + 1000 * 60 * 60 * 12
  })).toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(payload).digest('base64url');

  return `${payload}.${signature}`;
};

export default function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const email = typeof request.body?.email === 'string' ? request.body.email.trim() : '';
  const password = typeof request.body?.password === 'string' ? request.body.password : '';
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    response.status(500).json({ error: 'Admin login is not configured' });
    return;
  }

  if (email !== adminEmail || password !== adminPassword) {
    response.status(401).json({ error: 'Invalid admin email or password' });
    return;
  }

  response.status(200).json({ ok: true, token: createAdminToken(adminEmail, adminPassword), admin: { email: adminEmail } });
}
