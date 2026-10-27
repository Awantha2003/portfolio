// Runs after `vite build`: fills dist/index.html with the rendered page and SEO tags,
// and writes robots.txt + sitemap.xml.
import { readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadEnv } from 'vite';

Object.assign(process.env, { ...loadEnv('production', process.cwd(), ''), ...process.env });

const dist = resolve('dist');
const serverEntry = resolve(dist, 'server', 'entry-server.js');
const siteUrl = (process.env.SITE_URL || 'https://awantha-imesh-portfolio.vercel.app').replace(/\/+$/, '');

const { prerender } = await import(pathToFileURL(serverEntry).href);
const { html, head, state } = await prerender(siteUrl, process.env.GOOGLE_SITE_VERIFICATION);

const indexPath = resolve(dist, 'index.html');
const template = readFileSync(indexPath, 'utf8');
if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('index.html is missing the <!--app-head--> / <!--app-html--> markers');
}
writeFileSync(
  indexPath,
  template.
  replace(/<title>[\s\S]*?<\/title>\s*/, '').
  replace(/<meta name="description"[^>]*>\s*/, '').
  replace('<!--app-head-->', head).
  replace('<!--app-html-->', html).
  replace('</body>', `  ${state}\n  </body>`)
);

const today = new Date().toISOString().slice(0, 10);
writeFileSync(resolve(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`);
writeFileSync(resolve(dist, 'robots.txt'), `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${siteUrl}/sitemap.xml
`);

// The server bundle was only needed to render; don't deploy it.
rmSync(resolve(dist, 'server'), { recursive: true, force: true });
console.log(`[prerender] ${siteUrl} — ${(html.length / 1024).toFixed(0)} KB of HTML, sitemap.xml, robots.txt`);
