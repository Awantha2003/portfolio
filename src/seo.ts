import type { SiteContent } from './data/content';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Cloudinary transformation for a 1200×630 social preview, centred on the face. */
const socialImage = (url: string) =>
url.includes('res.cloudinary.com') ? url.replace(/\/upload\/(?:[^/]*,[^/]*\/)?/, '/upload/c_fill,g_face,w_1200,h_630,f_jpg,q_auto/') : url;

/** Everything Google and social sites read from <head>. Built from the live content at deploy time. */
export type Verification = { google?: string; bing?: string; };

export function buildHead(c: SiteContent, siteUrl: string, verification: Verification = {}) {
  const { profile, startup, education, experience, keySkills, projects, certifications, faq } = c;
  const url = siteUrl.replace(/\/+$/, '') + '/';
  const title = `${profile.name} | Software Engineer & Full Stack Developer in Sri Lanka`;
  const description = `${profile.name} is a software engineer, full stack developer and UI/UX engineer in ${profile.location}, and founder of ${startup.name}. See projects built with React, Node.js, Spring Boot and AI.`;
  const image = socialImage(c.images.profile);
  const current = experience.find((e) => /present/i.test(e.period));

  const person = {
    '@type': 'Person',
    '@id': `${url}#person`,
    name: profile.name,
    givenName: profile.firstName,
    alternateName: [profile.firstName, `${profile.name} Portfolio`],
    jobTitle: profile.role,
    description: profile.bio,
    url,
    image,
    email: `mailto:${profile.email}`,
    address: { '@type': 'PostalAddress', addressLocality: profile.location.split(',')[0].trim(), addressCountry: 'LK' },
    alumniOf: education.map((e) => ({ '@type': 'CollegeOrUniversity', name: e.institution })),
    nationality: { '@type': 'Country', name: 'Sri Lanka' },
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Software Engineer',
      occupationLocation: { '@type': 'Country', name: 'Sri Lanka' },
      skills: keySkills.join(', ')
    },
    hasCredential: certifications.map((cert) => ({
      '@type': 'EducationalOccupationalCredential',
      name: cert.name,
      credentialCategory: 'certificate',
      recognizedBy: { '@type': 'Organization', name: cert.issuer },
      ...(cert.url ? { url: cert.url } : {})
    })),
    ...(current ? { worksFor: { '@type': 'Organization', name: current.company } } : {}),
    founder: { '@type': 'Organization', name: startup.name, url: startup.url, logo: startup.logo },
    knowsAbout: keySkills,
    sameAs: [profile.github, profile.linkedin, startup.url, 'https://awantha-imesh-portfolio.vercel.app/'].filter((s) => s && !s.startsWith(url))
  };

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
    person,
    { '@type': 'WebSite', '@id': `${url}#website`, url, name: `${profile.name} — Portfolio`, inLanguage: 'en', publisher: { '@id': `${url}#person` } },
    {
      '@type': 'ProfilePage',
      '@id': `${url}#page`,
      url,
      name: title,
      description,
      isPartOf: { '@id': `${url}#website` },
      mainEntity: { '@id': `${url}#person` },
      primaryImageOfPage: image,
      dateModified: new Date().toISOString()
    },
    {
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
    },
    {
      '@type': 'ItemList',
      name: `Projects by ${profile.name}`,
      itemListElement: projects.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'CreativeWork',
          name: p.name,
          description: p.description,
          image: p.media.endsWith('.mp4') ? undefined : p.media,
          url: p.liveUrl || p.githubUrl || p.figmaUrl || undefined,
          creator: { '@id': `${url}#person` },
          keywords: p.stack.join(', ')
        }
      }))
    }]

  };

  const keywords = [
  profile.name, `${profile.name} portfolio`, `${profile.firstName} software engineer`, 'software engineer Sri Lanka', 'full stack developer Sri Lanka',
  'UI/UX engineer Colombo', startup.name, ...keySkills.slice(0, 8)].
  join(', ');

  return [
  `<title>${esc(title)}</title>`,
  `<meta name="description" content="${esc(description)}" />`,
  `<meta name="keywords" content="${esc(keywords)}" />`,
  `<meta name="author" content="${esc(profile.name)}" />`,
  `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
  `<link rel="canonical" href="${esc(url)}" />`,
  `<meta name="theme-color" content="#000000" />`,
  `<link rel="apple-touch-icon" href="${esc(image.replace('w_1200,h_630', 'w_180,h_180').replace('f_jpg', 'f_png'))}" />`,
  `<meta property="og:type" content="profile" />`,
  `<meta property="og:site_name" content="${esc(profile.name)}" />`,
  `<meta property="og:title" content="${esc(title)}" />`,
  `<meta property="og:description" content="${esc(description)}" />`,
  `<meta property="og:url" content="${esc(url)}" />`,
  `<meta property="og:image" content="${esc(image)}" />`,
  `<meta property="og:image:width" content="1200" />`,
  `<meta property="og:image:height" content="630" />`,
  `<meta property="og:image:alt" content="${esc(`${profile.name}, ${profile.role}`)}" />`,
  `<meta property="profile:first_name" content="${esc(profile.firstName)}" />`,
  `<meta property="profile:last_name" content="${esc(profile.name.split(' ').slice(1).join(' '))}" />`,
  `<meta name="twitter:card" content="summary_large_image" />`,
  `<meta name="twitter:title" content="${esc(title)}" />`,
  `<meta name="twitter:description" content="${esc(description)}" />`,
  `<meta name="twitter:image" content="${esc(image)}" />`,
  verification.google ? `<meta name="google-site-verification" content="${esc(verification.google)}" />` : '',
  verification.bing ? `<meta name="msvalidate.01" content="${esc(verification.bing)}" />` : '',
  `<script type="application/ld+json">${JSON.stringify(graph).replace(/</g, '\\u003c')}</script>`].
  filter(Boolean).join('\n    ');
}

/** Plain-text profiles for AI assistants and LLM crawlers (https://llmstxt.org). */
export function buildLlmsTxt(c: SiteContent, siteUrl: string) {
  const { profile, startup, education, experience, certifications, keySkills, skillGroups, projects, faq } = c;
  const url = siteUrl.replace(/\/+$/, '') + '/';
  const roles = experience.filter((e) => e.highlights?.length);
  const link = (p: SiteContent['projects'][number]) => p.liveUrl || p.githubUrl || p.figmaUrl;
  const summary = `${profile.name} is a software engineer, full stack developer and UI/UX engineer from ${profile.location}, an IT undergraduate at SLIIT, and the founder of ${startup.name}.`;

  const short = [
  `# ${profile.name}`,
  '',
  `> ${summary}`,
  '',
  profile.bio,
  '',
  '## Key facts',
  `- Role: ${profile.role}`,
  ...roles.map((r) => `- ${r.position} at ${r.company} (${r.period})`),
  `- Founder of ${startup.name} (${startup.category}): ${startup.url}`,
  ...education.map((e) => `- ${e.degree}, ${e.institution} (${e.period})`),
  `- Location: ${profile.location}`,
  `- Skills: ${keySkills.join(', ')}`,
  '',
  '## Links',
  `- [Portfolio](${url}): projects, experience and contact`,
  `- [GitHub](${profile.github})`,
  `- [LinkedIn](${profile.linkedin})`,
  `- [${startup.name}](${startup.url}): company website`,
  `- [CV](${profile.resumeUrl})`,
  '',
  '## Projects',
  ...projects.map((p) => `- ${link(p) ? `[${p.name}](${link(p)})` : p.name}: ${p.category}. ${p.stack.join(', ')}`),
  '',
  '## Contact',
  `- Email: ${profile.email}`,
  '',
  '## Optional',
  `- [Full profile](${url}llms-full.txt): experience details, every project description, certifications and FAQ`,
  ''].
  join('\n');

  const full = [
  `# ${profile.name} — full profile`,
  '',
  `> ${summary}`,
  '',
  '## About',
  profile.bio,
  '',
  '## Work experience',
  ...roles.flatMap((r) => [
  `### ${r.position} — ${r.company}`,
  `${r.period}${r.location ? ` · ${r.location}` : ''}`,
  r.description,
  ...(r.highlights ?? []).map((h) => `- ${h}`),
  '']
  ),
  `### Founder — ${startup.name}`,
  startup.vitals.map((v) => `${v.label}: ${v.value}`).join(' · '),
  startup.description,
  `Mission: ${startup.mission}`,
  `Website: ${startup.url}`,
  '',
  '## Education',
  ...education.map((e) => `- ${e.degree}, ${e.institution}, ${e.period} (${e.status})`),
  '',
  '## Certifications',
  ...certifications.map((cert) => `- ${cert.name} — ${cert.issuer} (${cert.year})${cert.url ? ` ${cert.url}` : ''}`),
  '',
  '## Skills',
  ...skillGroups.map((g) => `- ${g.category}: ${g.skills.join(', ')}`),
  `- Key skills: ${keySkills.join(', ')}`,
  '',
  '## Projects',
  ...projects.flatMap((p) => [
  `### ${p.name}`,
  `${p.category} · ${p.type}${p.year ? ` · ${p.year}` : ''}`,
  p.description,
  `Tech: ${p.stack.join(', ')}`,
  ...[p.liveUrl && `Live: ${p.liveUrl}`, p.githubUrl && `GitHub: ${p.githubUrl}`, p.figmaUrl && `Figma: ${p.figmaUrl}`].filter(Boolean) as string[],
  '']
  ),
  '## Frequently asked questions',
  ...faq.flatMap((f) => [`### ${f.q}`, f.a, '']),
  '## Contact',
  `- Email: ${profile.email}`,
  `- LinkedIn: ${profile.linkedin}`,
  `- GitHub: ${profile.github}`,
  `- Portfolio: ${url}`,
  ''].
  join('\n');

  return { short, full };
}
