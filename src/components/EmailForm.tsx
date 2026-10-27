import React, { useId, useState } from 'react';
import { ArrowRightIcon, CheckIcon, Loader2Icon } from 'lucide-react';

type EmailFormProps = {
  cta?: string;
};

type Status = 'idle' | 'loading' | 'success' | 'error';

export function EmailForm({ cta = 'Do it' }: EmailFormProps) {
  const id = useId();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    setTimeout(() => setStatus('success'), 900);
  };

  if (status === 'success') {
    return (
      <p className="flex items-center justify-center gap-2 text-xl font-semibold text-lime" role="status">
        <CheckIcon className="h-5 w-5" /> You’re in. Check your inbox.
      </p>);

  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-[816px]" noValidate>
      <div className="flex items-center gap-2 rounded-full border-2 border-white/25 bg-black/30 p-2 pl-6 backdrop-blur-sm transition-colors duration-150 focus-within:border-white/50 md:p-3 md:pl-11">
        <label htmlFor={id} className="sr-only">Email address</label>
        <input
          id={id}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          placeholder="Enter your email address"
          className="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-white/55 md:text-2xl" />
        
        <button
          type="submit"
          disabled={status === 'loading'}
          className="flex shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-3 text-lg font-bold text-white transition-[background-color,transform] duration-150 ease-out hover:bg-brand-dark active:scale-[0.97] disabled:opacity-70 md:px-14 md:py-5 md:text-2xl">
          
          {status === 'loading' ?
          <Loader2Icon className="h-6 w-6 animate-spin" /> :

          <>
              {cta} <ArrowRightIcon className="h-6 w-6" strokeWidth={2.5} />
            </>
          }
        </button>
      </div>
      {status === 'error' &&
      <p className="mt-3 text-center text-sm font-medium text-red-400" role="alert">Please enter a valid email.</p>
      }
    </form>);

}