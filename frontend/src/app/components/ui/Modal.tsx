'use client';
import { useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export default function Modal({ isOpen, onClose, title, children, size = 'md' }: Props) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const widths = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-4xl' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-[#111111] border border-[#2a2a2a] rounded-2xl w-full ${widths[size]} max-h-[90vh] overflow-y-auto z-10`}>
        <div className="sticky top-0 bg-[#111111] border-b border-[#2a2a2a] px-6 py-4 flex items-center justify-between">
          <h2 className="font-bold text-lg">{title}</h2>
          <button onClick={onClose} className="text-[#9a9a9a] hover:text-white text-xl leading-none p-1">✕</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
