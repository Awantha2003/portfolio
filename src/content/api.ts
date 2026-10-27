import type { ContentKey } from '../data/content';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    credentials: 'same-origin',
    ...init,
    headers: init?.body ? { 'Content-Type': 'application/json', ...init.headers } : init?.headers
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string; }).error ?? `Request failed (${res.status})`);
  return data as T;
}

export type SavedContent = { content: Partial<Record<ContentKey, unknown>>; updatedAt: Partial<Record<ContentKey, string>>; };

export const fetchContent = () => request<SavedContent>('/api/content');

export const saveSection = (key: ContentKey, data: unknown) =>
request(`/api/content?key=${key}`, { method: 'PUT', body: JSON.stringify({ data }) });

export const resetSection = (key: ContentKey) => request(`/api/content?key=${key}`, { method: 'DELETE' });

export type Session = { authenticated: boolean; configured: { database: boolean; uploads: boolean; }; };

export const fetchSession = () => request<Session>('/api/me');
export const login = (password: string) => request('/api/login', { method: 'POST', body: JSON.stringify({ password }) });
export const logout = () => request('/api/logout', { method: 'POST' });

/** Uploads an image or video straight to Cloudinary using a signature from our API. Returns the file's URL. */
export async function uploadMedia(file: File): Promise<string> {
  const sig = await request<{ cloudName: string; apiKey: string; timestamp: string; folder: string; signature: string; }>(
    '/api/upload-signature',
    { method: 'POST' }
  );
  const form = new FormData();
  form.append('file', file);
  form.append('api_key', sig.apiKey);
  form.append('timestamp', sig.timestamp);
  form.append('folder', sig.folder);
  form.append('signature', sig.signature);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/auto/upload`, { method: 'POST', body: form });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message ?? 'Upload failed');
  return data.secure_url as string;
}
