import React, { useId, useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon, ChevronDownIcon, Loader2Icon, PlusIcon, Trash2Icon, UploadIcon } from 'lucide-react';
import { uploadMedia } from '../content/api';
import { emptyItem, type Field } from './schema';

type Obj = Record<string, unknown>;

const input = 'w-full rounded-lg border border-black/15 bg-white px-3 py-2 text-[15px] text-ink outline-none transition-colors duration-150 focus:border-brand focus:ring-2 focus:ring-brand/20';
const iconBtn = 'rounded-md p-1.5 text-black/50 transition-colors duration-150 hover:bg-black/5 hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent';

const isVideo = (url: string) => /\.(mp4|webm|mov)(\?|$)/i.test(url) || url.includes('/video/upload/');

function move<T>(list: T[], from: number, to: number) {
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function MediaInput({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void; }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      onChange(await uploadMedia(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex gap-4">
      <div className="flex h-24 w-32 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-black/5 ring-1 ring-black/10">
        {value ?
        isVideo(value) ?
        <video src={value} muted playsInline className="h-full w-full object-cover" /> :
        <img src={value} alt="" className="h-full w-full object-cover" /> :

        <span className="text-xs text-black/40">No file</span>
        }
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        <input id={id} className={input} value={value} onChange={(e) => onChange(e.target.value)} placeholder="https://… or upload" />
        <label className={`inline-flex cursor-pointer items-center gap-2 rounded-lg bg-ink px-3 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-black ${busy ? 'pointer-events-none opacity-60' : ''}`}>
          {busy ? <Loader2Icon className="h-4 w-4 animate-spin" /> : <UploadIcon className="h-4 w-4" />}
          {busy ? 'Uploading…' : 'Upload'}
          <input type="file" accept="image/*,video/*" className="sr-only" onChange={onFile} />
        </label>
        {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      </div>
    </div>);

}

export function StringList({ value, onChange, placeholder = 'Text' }: { value: string[]; onChange: (v: string[]) => void; placeholder?: string; }) {
  return (
    <div className="space-y-2">
      {value.map((line, i) =>
      <div key={i} className="flex items-center gap-1">
          <input className={input} value={line} placeholder={placeholder} onChange={(e) => onChange(value.map((v, j) => j === i ? e.target.value : v))} />
          <button type="button" className={iconBtn} aria-label="Move up" disabled={i === 0} onClick={() => onChange(move(value, i, i - 1))}><ArrowUpIcon className="h-4 w-4" /></button>
          <button type="button" className={iconBtn} aria-label="Move down" disabled={i === value.length - 1} onClick={() => onChange(move(value, i, i + 1))}><ArrowDownIcon className="h-4 w-4" /></button>
          <button type="button" className={`${iconBtn} hover:!text-red-600`} aria-label="Remove" onClick={() => onChange(value.filter((_, j) => j !== i))}><Trash2Icon className="h-4 w-4" /></button>
        </div>
      )}
      <button type="button" onClick={() => onChange([...value, ''])} className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-semibold text-brand transition-colors duration-150 hover:bg-brand/10">
        <PlusIcon className="h-4 w-4" /> Add line
      </button>
    </div>);

}

function FieldInput({ field, value, onChange }: { field: Field; value: unknown; onChange: (v: unknown) => void; }) {
  const id = useId();
  const str = typeof value === 'string' ? value : '';
  let control: React.ReactNode;
  switch (field.type) {
    case 'textarea':
      control = <textarea id={id} rows={4} className={`${input} resize-y`} value={str} onChange={(e) => onChange(e.target.value)} />;
      break;
    case 'media':
      control = <MediaInput id={id} value={str} onChange={onChange} />;
      break;
    case 'checkbox':
      control =
      <input id={id} type="checkbox" className="h-5 w-5 accent-brand" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />;
      break;
    case 'select':
      control =
      <select id={id} className={input} value={str} onChange={(e) => onChange(e.target.value)}>
          {field.options.map((o) => <option key={o}>{o}</option>)}
        </select>;
      break;
    case 'tags':
      control =
      <input
        id={id}
        className={input}
        defaultValue={Array.isArray(value) ? value.join(', ') : ''}
        onChange={(e) => onChange(e.target.value.split(',').map((t) => t.trim()).filter(Boolean))}
        placeholder="Comma separated" />;

      break;
    case 'strings':
      control = <StringList value={Array.isArray(value) ? value as string[] : []} onChange={onChange} />;
      break;
    case 'list':
      control = <ListEditor fields={field.fields} itemTitle={field.itemTitle} value={Array.isArray(value) ? value as Obj[] : []} onChange={onChange} compact />;
      break;
    default:
      control = <input id={id} type={field.type === 'url' ? 'url' : 'text'} className={input} value={str} onChange={(e) => onChange(e.target.value)} />;
  }
  const hint = 'hint' in field ? field.hint : undefined;
  return (
    <div className={field.type === 'checkbox' ? 'flex items-center gap-3' : 'space-y-1.5'}>
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {field.label}
        {hint && <span className="ml-2 font-normal text-black/45">{hint}</span>}
      </label>
      {control}
    </div>);

}

export function ObjectEditor({ fields, value, onChange }: { fields: Field[]; value: Obj; onChange: (v: Obj) => void; }) {
  return (
    <div className="space-y-5">
      {fields.map((f) =>
      <FieldInput key={f.name} field={f} value={value[f.name]} onChange={(v) => onChange({ ...value, [f.name]: v })} />
      )}
    </div>);

}

export function ListEditor({ fields, itemTitle, value, onChange, compact = false }: {fields: Field[];itemTitle: string;value: Obj[];onChange: (v: Obj[]) => void;compact?: boolean;}) {
  const [open, setOpen] = useState<number | null>(null);

  const add = () => {
    onChange([...value, emptyItem(fields)]);
    setOpen(value.length);
  };
  const remove = (i: number) => {
    if (!window.confirm('Remove this item?')) return;
    onChange(value.filter((_, j) => j !== i));
    setOpen(null);
  };
  const reorder = (i: number, to: number) => {
    onChange(move(value, i, to));
    setOpen(open === i ? to : open);
  };

  return (
    <div className="space-y-2">
      {value.map((item, i) => {
        const isOpen = open === i;
        const title = String(item[itemTitle] ?? '') || 'Untitled';
        return (
          <div key={i} className={`rounded-xl bg-white ring-1 ${isOpen ? 'ring-brand/40' : 'ring-black/10'} ${compact ? '' : 'shadow-sm'}`}>
            <div className="flex items-center gap-1 px-2 py-1.5">
              <button type="button" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors duration-150 hover:bg-black/[0.03]">
                <ChevronDownIcon className={`h-4 w-4 shrink-0 text-black/40 transition-transform duration-200 ${isOpen ? '' : '-rotate-90'}`} />
                <span className="w-6 shrink-0 text-xs font-semibold tabular-nums text-black/35">{i + 1}</span>
                <span className="truncate font-medium text-ink">{title}</span>
              </button>
              <button type="button" className={iconBtn} aria-label="Move up" disabled={i === 0} onClick={() => reorder(i, i - 1)}><ArrowUpIcon className="h-4 w-4" /></button>
              <button type="button" className={iconBtn} aria-label="Move down" disabled={i === value.length - 1} onClick={() => reorder(i, i + 1)}><ArrowDownIcon className="h-4 w-4" /></button>
              <button type="button" className={`${iconBtn} hover:!text-red-600`} aria-label="Remove" onClick={() => remove(i)}><Trash2Icon className="h-4 w-4" /></button>
            </div>
            {isOpen &&
            <div className="border-t border-black/5 p-4">
                <ObjectEditor fields={fields} value={item} onChange={(v) => onChange(value.map((x, j) => j === i ? v : x))} />
              </div>
            }
          </div>);

      })}
      <button type="button" onClick={add} className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-semibold text-brand transition-colors duration-150 hover:bg-brand/10">
        <PlusIcon className="h-4 w-4" /> Add item
      </button>
    </div>);

}
