import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2Icon, ExternalLinkIcon, Loader2Icon, LogOutIcon, RotateCcwIcon, SaveIcon, TriangleAlertIcon } from 'lucide-react';
import { defaultContent, type ContentKey, type SiteContent } from '../data/content';
import { mergeContent } from '../content/ContentProvider';
import { fetchContent, fetchSession, login, logout, resetSection, saveSection, type Session } from '../content/api';
import { ListEditor, ObjectEditor, StringList } from './fields';
import { sections } from './schema';

type Status = { tone: 'ok' | 'error'; text: string; } | null;

function Login({ onDone }: { onDone: () => void; }) {
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await login(password);
      onDone();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed');
      setBusy(false);
    }
  };

  return (
    <main className="grid-bg flex min-h-screen items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-[24px] bg-white p-8 shadow-[0_30px_80px_-35px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
        <p className="font-display text-4xl uppercase text-ink">Admin<span className="text-brand">.</span></p>
        <p className="mt-2 text-black/55">Sign in to edit your portfolio.</p>
        <label htmlFor="pw" className="mt-8 block text-sm font-semibold text-ink">Password</label>
        <input
          id="pw"
          type="password"
          autoFocus
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-black/15 px-3 py-2.5 outline-none transition-colors duration-150 focus:border-brand focus:ring-2 focus:ring-brand/20" />

        {error && <p className="mt-3 text-sm text-red-600" role="alert">{error}</p>}
        <button disabled={busy || !password} className="cut mt-6 flex w-full items-center justify-center gap-2 bg-brand py-3 font-display text-xl uppercase tracking-[0.08em] text-white transition-[background-color,transform] duration-150 hover:bg-brand-dark active:scale-[0.98] disabled:opacity-60">
          {busy && <Loader2Icon className="h-5 w-5 animate-spin" />} Sign in
        </button>
      </form>
    </main>);

}

function Dashboard({ session, onSignOut }: { session: Session; onSignOut: () => void; }) {
  const [saved, setSaved] = useState<SiteContent | null>(null);
  const [drafts, setDrafts] = useState<SiteContent | null>(null);
  const [updatedAt, setUpdatedAt] = useState<Partial<Record<ContentKey, string>>>({});
  const [loadError, setLoadError] = useState('');
  const [active, setActive] = useState<ContentKey>(sections[0].key);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  useEffect(() => {
    fetchContent().
    then((res) => {
      const merged = mergeContent(res.content);
      setSaved(merged);
      setDrafts(merged);
      setUpdatedAt(res.updatedAt);
    }).
    catch((err) => {
      setLoadError(err.message);
      setSaved(defaultContent);
      setDrafts(defaultContent);
    });
  }, []);

  const dirty = useMemo(() => {
    const keys = new Set<ContentKey>();
    if (!saved || !drafts) return keys;
    for (const s of sections) if (JSON.stringify(saved[s.key]) !== JSON.stringify(drafts[s.key])) keys.add(s.key);
    return keys;
  }, [saved, drafts]);

  useEffect(() => {
    if (dirty.size === 0) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  useEffect(() => {
    if (status?.tone !== 'ok') return;
    const t = setTimeout(() => setStatus(null), 3000);
    return () => clearTimeout(t);
  }, [status]);

  if (!saved || !drafts) {
    return <div className="flex min-h-screen items-center justify-center"><Loader2Icon className="h-8 w-8 animate-spin text-brand" /></div>;
  }

  const section = sections.find((s) => s.key === active)!;
  const value = drafts[active] as unknown;
  const setValue = (v: unknown) => setDrafts({ ...drafts, [active]: v });

  const save = async () => {
    setBusy(true);
    try {
      await saveSection(active, value);
      setSaved({ ...saved, [active]: value });
      setUpdatedAt({ ...updatedAt, [active]: new Date().toISOString() });
      setStatus({ tone: 'ok', text: `${section.title} saved — it’s live on the site.` });
    } catch (err) {
      setStatus({ tone: 'error', text: err instanceof Error ? err.message : 'Save failed' });
    } finally {
      setBusy(false);
    }
  };

  const reset = async () => {
    if (!window.confirm(`Reset “${section.title}” to the built-in default? Your saved version will be deleted.`)) return;
    setBusy(true);
    try {
      await resetSection(active);
      setSaved({ ...saved, [active]: defaultContent[active] });
      setDrafts({ ...drafts, [active]: defaultContent[active] });
      setUpdatedAt({ ...updatedAt, [active]: undefined });
      setStatus({ tone: 'ok', text: `${section.title} reset to default.` });
    } catch (err) {
      setStatus({ tone: 'error', text: err instanceof Error ? err.message : 'Reset failed' });
    } finally {
      setBusy(false);
    }
  };

  const groups = [...new Set(sections.map((s) => s.group))];
  const warnings = [
  !session.configured.database && 'DATABASE_URL is not set — saving will fail until you add your Neon connection string.',
  !session.configured.uploads && 'Cloudinary is not configured — uploads will fail until you add CLOUDINARY_URL.',
  loadError && `Could not load saved content: ${loadError}. Showing built-in defaults.`].
  filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-20 border-b border-black/10 bg-white/90 backdrop-blur">
        <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-6">
          <p className="font-display text-2xl uppercase">Admin<span className="text-brand">.</span></p>
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-black/70 transition-colors duration-150 hover:bg-black/5 hover:text-ink">
              <ExternalLinkIcon className="h-4 w-4" /> View site
            </a>
            <button onClick={onSignOut} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-black/70 transition-colors duration-150 hover:bg-black/5 hover:text-ink">
              <LogOutIcon className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-6 md:grid-cols-[240px_1fr] md:px-6">
        <nav aria-label="Sections" className="md:sticky md:top-[76px] md:h-[calc(100vh-100px)] md:overflow-y-auto">
          <select className="w-full rounded-lg border border-black/15 bg-white px-3 py-2.5 md:hidden" value={active} onChange={(e) => setActive(e.target.value as ContentKey)}>
            {sections.map((s) => <option key={s.key} value={s.key}>{s.group} · {s.title}{dirty.has(s.key) ? ' •' : ''}</option>)}
          </select>
          <div className="hidden space-y-5 md:block">
            {groups.map((g) =>
            <div key={g}>
                <p className="px-3 text-xs font-bold uppercase tracking-[0.15em] text-black/40">{g}</p>
                <ul className="mt-1.5 space-y-0.5">
                  {sections.filter((s) => s.group === g).map((s) =>
                <li key={s.key}>
                      <button
                    onClick={() => setActive(s.key)}
                    aria-current={active === s.key ? 'page' : undefined}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[15px] transition-colors duration-150 ${
                    active === s.key ? 'bg-ink font-semibold text-white' : 'text-black/75 hover:bg-black/5'}`
                    }>

                        {s.title}
                        {dirty.has(s.key) && <span className="h-2 w-2 rounded-full bg-brand" aria-label="Unsaved changes" />}
                      </button>
                    </li>
                )}
                </ul>
              </div>
            )}
          </div>
        </nav>

        <main className="min-w-0 space-y-4">
          {warnings.map((w) =>
          <p key={w} className="flex items-start gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900 ring-1 ring-amber-200">
              <TriangleAlertIcon className="mt-0.5 h-4 w-4 shrink-0" /> {w}
            </p>
          )}

          <section className="rounded-[20px] bg-white ring-1 ring-black/5">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-black/5 p-5 md:p-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">{section.title}</h1>
                <p className="mt-1 text-sm text-black/50">
                  {section.description ? `${section.description} ` : ''}
                  {updatedAt[active] ? `Last saved ${new Date(updatedAt[active]!).toLocaleString()}.` : 'Using built-in default.'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={reset} disabled={busy || !updatedAt[active]} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-black/60 transition-colors duration-150 hover:bg-black/5 hover:text-ink disabled:opacity-40 disabled:hover:bg-transparent">
                  <RotateCcwIcon className="h-4 w-4" /> Reset
                </button>
                <button onClick={save} disabled={busy || !dirty.has(active)} className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-bold text-white transition-[background-color,transform] duration-150 hover:bg-brand-dark active:scale-[0.97] disabled:opacity-40">
                  {busy ? <Loader2Icon className="h-4 w-4 animate-spin" /> : <SaveIcon className="h-4 w-4" />} Save
                </button>
              </div>
            </div>

            <div className="p-5 md:p-6" key={active}>
              {section.kind === 'object' &&
              <ObjectEditor fields={section.fields} value={value as Record<string, unknown>} onChange={setValue} />
              }
              {section.kind === 'list' &&
              <ListEditor fields={section.fields} itemTitle={section.itemTitle} value={value as Record<string, unknown>[]} onChange={setValue} />
              }
              {section.kind === 'strings' && <StringList value={value as string[]} onChange={setValue} />}
            </div>
          </section>
        </main>
      </div>

      {status &&
      <div role="status" className={`fixed bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-lg ${status.tone === 'ok' ? 'bg-ink' : 'bg-red-600'}`}>
          {status.tone === 'ok' ? <CheckCircle2Icon className="h-4 w-4 text-lime" /> : <TriangleAlertIcon className="h-4 w-4" />}
          {status.text}
          {status.tone === 'error' && <button className="ml-2 underline" onClick={() => setStatus(null)}>Dismiss</button>}
        </div>
      }
    </div>);

}

export default function AdminApp() {
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState('');

  const refresh = () => fetchSession().then(setSession).catch((err) => setError(err.message));
  useEffect(() => {
    document.title = 'Admin · Portfolio';
    // Keep the admin panel out of search results.
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex, nofollow';
    document.head.appendChild(robots);
    refresh();
  }, []);

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 text-center">
        <div>
          <p className="text-xl font-bold">The admin API isn’t reachable.</p>
          <p className="mt-2 text-black/55">{error}</p>
        </div>
      </main>);

  }
  if (!session) return <div className="flex min-h-screen items-center justify-center"><Loader2Icon className="h-8 w-8 animate-spin text-brand" /></div>;
  if (!session.authenticated) return <Login onDone={refresh} />;
  return <Dashboard session={session} onSignOut={() => logout().finally(refresh)} />;
}
