import { defaultContent } from '../src/data/content.js';
import { requireAdmin } from './_lib/auth.js';
import { ensureSchema, sql } from './_lib/db.js';
import { HttpError, readJson, route } from './_lib/http.js';

function sectionKey(url: URL) {
  const key = url.searchParams.get('key') ?? '';
  if (!Object.prototype.hasOwnProperty.call(defaultContent, key)) throw new HttpError(400, `Unknown section "${key}"`);
  return key as keyof typeof defaultContent;
}

export default route({
  // Public: the site reads its saved sections from here.
  async GET() {
    await ensureSchema();
    const rows = await sql('select key, data::text as data, updated_at::text as updated_at from site_content');
    const content: Record<string, unknown> = {};
    const updatedAt: Record<string, string | null> = {};
    for (const row of rows) {
      if (!row.key || !row.data || !(row.key in defaultContent)) continue;
      content[row.key] = JSON.parse(row.data);
      updatedAt[row.key] = row.updated_at;
    }
    return { content, updatedAt };
  },

  async PUT(req, _res, url) {
    requireAdmin(req);
    const key = sectionKey(url);
    const { data } = await readJson(req);
    const expected = defaultContent[key];
    const sameShape = Array.isArray(expected) ? Array.isArray(data) : typeof data === 'object' && data !== null && !Array.isArray(data);
    if (!sameShape) throw new HttpError(400, `"${key}" must be ${Array.isArray(expected) ? 'a list' : 'an object'}`);
    await ensureSchema();
    await sql(
      `insert into site_content (key, data) values ($1, $2::jsonb)
       on conflict (key) do update set data = excluded.data, updated_at = now()`,
      [key, JSON.stringify(data)]
    );
    return { ok: true };
  },

  // Removes the saved copy so the section falls back to the built-in default.
  async DELETE(req, _res, url) {
    requireAdmin(req);
    const key = sectionKey(url);
    await ensureSchema();
    await sql('delete from site_content where key = $1', [key]);
    return { ok: true };
  }
});
