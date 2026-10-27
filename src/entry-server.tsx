import React from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import { ContentContext, mergeContent } from './content/ContentProvider';
import { defaultContent, type SiteContent } from './data/content';
import { buildHead } from './seo';
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
export async function prerender(siteUrl: string, googleVerification?: string) {
  const { content, saved } = await loadContent();
  const html = renderToString(
    <ContentContext.Provider value={content}>
      <App />
    </ContentContext.Provider>
  );
  return {
    html,
    head: buildHead(content, siteUrl, googleVerification),
    // Lets the browser start with the same content the HTML was rendered from.
    state: `<script>window.__CONTENT__=${JSON.stringify(saved).replace(/</g, '\\u003c')}</script>`
  };
}
