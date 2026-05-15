'use client';
import { ButtonHTMLAttributes } from 'react';
import Spinner from './Spinner';

type Variant = 'primary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

export default function Button({ variant = 'primary', size = 'md', loading, children, className = '', disabled, ...props }: Props) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed';
  const variants: Record<Variant, string> = {
    primary: 'bg-[#ff6b6b] hover:bg-[#ff4757] text-white shadow-[0_0_16px_rgba(255,107,107,0.3)]',
    outline: 'border border-[#ff6b6b] text-[#ff6b6b] hover:bg-[#ff6b6b] hover:text-white',
    ghost:   'text-[#9a9a9a] hover:text-white hover:bg-[#1a1a1a]',
    danger:  'bg-red-600 hover:bg-red-700 text-white',
  };
  const sizes: Record<Size, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3 text-base',
  };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} disabled={loading || disabled} {...props}>
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  );
}
