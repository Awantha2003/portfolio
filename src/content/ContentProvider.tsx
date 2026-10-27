import React, { createContext, useContext, useEffect, useState } from 'react';
import { defaultContent, type ContentKey, type SiteContent } from '../data/content';
import { fetchContent } from './api';

/** Overlays saved sections on the defaults, ignoring anything whose shape doesn't match. */
export function mergeContent(saved: Partial<Record<ContentKey, unknown>>): SiteContent {
  const merged: Record<string, unknown> = { ...defaultContent };
  for (const key of Object.keys(defaultContent) as ContentKey[]) {
    const value = saved[key];
    const fallback = defaultContent[key];
    if (Array.isArray(fallback)) {
      if (Array.isArray(value)) merged[key] = value;
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      merged[key] = { ...fallback, ...value };
    }
  }
  return merged as SiteContent;
}

export const ContentContext = createContext<SiteContent>(defaultContent);

export const useContent = () => useContext(ContentContext);

const WAIT_MS = 2500;

// Content the page was pre-rendered with (see scripts/prerender.mjs).
function readPreloaded(): Partial<Record<ContentKey, unknown>> | undefined {
  if (typeof document === 'undefined') return undefined;
  const el = document.getElementById('__CONTENT__');
  if (!el?.textContent) return undefined;
  try {
    return JSON.parse(el.textContent);
  } catch {
    return undefined;
  }
}
const preloaded = readPreloaded();

export function ContentProvider({ children }: { children: React.ReactNode; }) {
  const [content, setContent] = useState<SiteContent | null>(() => preloaded ? mergeContent(preloaded) : null);

  useEffect(() => {
    let done = false;
    const finish = (value: SiteContent) => {
      if (done) return;
      done = true;
      // Only re-render if the admin changed something since the last deploy.
      setContent((prev) => prev && JSON.stringify(prev) === JSON.stringify(value) ? prev : value);
    };
    // Show the built-in content if the database is slow or not set up.
    const timer = setTimeout(() => !preloaded && finish(defaultContent), WAIT_MS);
    fetchContent().
    then((res) => finish(mergeContent(res.content))).
    catch(() => !preloaded && finish(defaultContent)).
    finally(() => clearTimeout(timer));
    return () => clearTimeout(timer);
  }, []);

  if (!content) return <div className="min-h-screen bg-black" aria-busy="true" />;
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}
