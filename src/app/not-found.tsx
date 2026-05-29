import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-arcadeBg text-white flex items-center justify-center p-6 scanlines">
      <div className="max-w-2xl rounded-[2rem] border border-white/10 bg-slate-950/90 p-10 text-center shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
        <p className="text-cyan-300 uppercase tracking-[0.35em] text-sm">404</p>
        <h1 className="mt-4 text-5xl font-black neon-glow">頁面不存在</h1>
        <p className="mt-4 text-white/70">看起來你到達了迷失的洞穴。回到主選單重新開始吧！</p>
        <Link href="/" className="mt-8 inline-block rounded-3xl bg-gradient-to-r from-neonPink to-neonCyan px-6 py-4 text-sm font-bold text-black transition hover:brightness-110">
          返回首頁
        </Link>
      </div>
    </main>
  );
}
