import { HttpError } from './http.js';

const MAX_STRING = 5000;
const MAX_ITEMS = 300;
const MAX_DEPTH = 6;
// Script-capable URL schemes, also caught when hidden with whitespace or control characters.
const DANGEROUS_URL = /^[\s\u0000-\u001f]*(javascript|vbscript|data\s*:\s*text\/html|data\s*:\s*image\/svg)/i;
// Any tag-like text (`<b`, `</div`, `<!--`); plain text never needs it.
const HTML_TAG = /<\s*\/?\s*[a-z!?]/i;

/**
 * Checks admin-submitted content before it is stored. React already escapes text when rendering;
 * this blocks values that would still be dangerous (script URLs, raw HTML) and caps the size.
 */
export function assertSafeContent(value: unknown, path = 'data', depth = 0): void {
  if (depth > MAX_DEPTH) throw new HttpError(400, `${path} is nested too deeply`);
  if (value === null || typeof value === 'boolean' || typeof value === 'number') return;
  if (typeof value === 'string') {
    if (value.length > MAX_STRING) throw new HttpError(400, `${path} is too long`);
    // Strip characters browsers ignore inside URLs before matching.
    const squashed = value.replace(/[\t\n\r]/g, '');
    if (DANGEROUS_URL.test(squashed)) throw new HttpError(400, `${path} contains a blocked link type`);
    if (HTML_TAG.test(value)) throw new HttpError(400, `${path} cannot contain HTML`);
    return;
  }
  if (Array.isArray(value)) {
    if (value.length > MAX_ITEMS) throw new HttpError(400, `${path} has too many items`);
    value.forEach((v, i) => assertSafeContent(v, `${path}[${i}]`, depth + 1));
    return;
  }
  if (typeof value === 'object') {
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (!/^[A-Za-z][A-Za-z0-9_]{0,40}$/.test(k)) throw new HttpError(400, `${path} has an invalid field name`);
      assertSafeContent(v, `${path}.${k}`, depth + 1);
    }
    return;
  }
  throw new HttpError(400, `${path} has an unsupported value`);
}
