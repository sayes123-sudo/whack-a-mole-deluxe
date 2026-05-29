import React from 'react';

export default function ArcadeButton({ children, onClick, className = '' }: React.PropsWithChildren<{ onClick?: () => void; className?: string }>) {
  return (
    <button
      onClick={onClick}
      className={
        'inline-flex min-w-[150px] items-center justify-center rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-neonPink via-neonAmber to-neonCyan px-6 py-3 text-base font-black uppercase tracking-[0.12em] text-black shadow-[0_14px_40px_rgba(255,102,204,0.14)] transition duration-200 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-95 sm:px-8 sm:py-4 ' +
        className
      }
    >
      {children}
    </button>
  );
}
