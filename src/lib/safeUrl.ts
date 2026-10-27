/** Returns the URL only if it is a web, mail, phone or in-page link; anything else (e.g. `javascript:`) becomes "#". */
export function safeUrl(url: string | undefined | null): string {
  const value = (url ?? '').trim();
  if (!value) return '#';
  if (value.startsWith('#') || (value.startsWith('/') && !value.startsWith('//'))) return value;
  try {
    const { protocol } = new URL(value);
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(protocol) ? value : '#';
  } catch {
    return '#';
  }
}
