import { useEffect } from 'react';

const SITE_URL = 'https://portfolio-tau-sepia-34.vercel.app/';
const SITE_TITLE = 'Awantha Imesh | Full Stack Developer & UI/UX Engineer';
const SITE_DESCRIPTION =
  'Awantha Imesh is a full stack developer and UI/UX engineer building React, MERN, Spring Boot, mobile, and product design projects in Sri Lanka.';

const setMeta = (selector: string, attribute: 'content' | 'href', value: string) => {
  const element = document.head.querySelector(selector);

  if (element) {
    element.setAttribute(attribute, value);
  }
};

const SEO = () => {
  useEffect(() => {
    const isAdminPage = window.location.pathname === '/admin';

    document.title = isAdminPage ? 'Admin | Awantha Imesh Portfolio' : SITE_TITLE;
    setMeta('meta[name="description"]', 'content', isAdminPage ? 'Portfolio admin area.' : SITE_DESCRIPTION);
    setMeta('meta[name="robots"]', 'content', isAdminPage ? 'noindex, nofollow' : 'index, follow');
    setMeta('link[rel="canonical"]', 'href', isAdminPage ? `${SITE_URL}admin` : SITE_URL);
    setMeta('meta[property="og:url"]', 'content', isAdminPage ? `${SITE_URL}admin` : SITE_URL);
    setMeta('meta[property="og:title"]', 'content', isAdminPage ? 'Admin | Awantha Imesh Portfolio' : SITE_TITLE);
    setMeta('meta[property="og:description"]', 'content', isAdminPage ? 'Portfolio admin area.' : SITE_DESCRIPTION);
    setMeta('meta[name="twitter:title"]', 'content', isAdminPage ? 'Admin | Awantha Imesh Portfolio' : SITE_TITLE);
    setMeta('meta[name="twitter:description"]', 'content', isAdminPage ? 'Portfolio admin area.' : SITE_DESCRIPTION);
  }, []);

  return null;
};

export default SEO;
