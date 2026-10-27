import { renderToString } from 'react-dom/server';
import { App } from './App';
import { ContentContext, mergeContent } from './content/ContentProvider';
import { defaultContent, type SiteContent } from './data/content';
import { buildHead, buildLlmsTxt, type Verification } from './seo';
import { sql } from '../api/_lib/db';

/** Reads the sections saved from the admin panel, if the database is reachable at build time. */
async function loadContent(): Promise<{ content: SiteContent; saved: Record<string, unknown>; }> {
  if (!process.env.DATABASE_URL) return { content: defaultContent, saved: {} };
  try {
    const rows = await sql('select key, data::text as data from site_content');
    const saved = Object.fromEntries(rows.filter((r) => r.key && r.data).map((r) => [r.key!, JSON.parse(r.data!)]));
    return { content: mergeContent(saved), saved };
  } catch (err) {
    console.warn('[prerender] could not read saved content, using defaults:', (err as Error).message);
    return { content: defaultContent, saved: {} };
  }
}

/** Renders the portfolio to static HTML so search engines see the full page without running JavaScript. */
export async function prerender(siteUrl: string, verification: Verification = {}) {
  const { content, saved } = await loadContent();
  const html = renderToString(
    <ContentContext.Provider value={content}>
      <App />
    </ContentContext.Provider>
  );
  return {
    html,
    head: buildHead(content, siteUrl, verification),
    llms: buildLlmsTxt(content, siteUrl),
    // Lets the browser start with the same content the HTML was rendered from.
    // A JSON data block, not an inline script, so the Content-Security-Policy can forbid inline scripts.
    state: `<script id="__CONTENT__" type="application/json">${JSON.stringify(saved).replace(/</g, '\\u003c')}</script>`
  };
}
