import Link from 'next/link';

export default function HowToPlay() {
  return (
    <main className="min-h-screen bg-arcadeBg text-white scanlines px-6 py-12">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
        <h2 className="text-4xl font-black neon-glow">玩法說明</h2>
        <p className="mt-4 text-white/75 leading-8">
          地鼠大作戰 Deluxe 是一款結合時間壓力與連擊獎勵的街機遊戲。每一關都要迅速點擊正確目標，避免炸彈並維持 Combo。
        </p>
        <div className="mt-8 grid gap-4 rounded-[2rem] border border-white/10 bg-black/20 p-6">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">基本規則</p>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-white/75">
              <li>點擊出現的地鼠得分，連擊可提升每次命中獎勵。</li>
              <li>金色地鼠提供更高分數，優先擊中可快速達成目標。</li>
              <li>炸彈會扣命並重置 Combo，請避免誤觸。</li>
              <li>時間獎勵藏在某些洞口，可延長倒數時間。</li>
              <li>若在時間結束前達成目標分數，即可過關並進入下一關。</li>
            </ul>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">技巧提示</p>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-white/75">
              <li>開局先找出最佳攻擊節奏，不要亂按空洞。</li>
              <li>若 Combo 越高，地鼠分數乘數也會越大。</li>
              <li>最後幾秒請專注於最容易點到的位置。</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="rounded-3xl bg-neonPink px-6 py-4 text-center text-sm font-bold text-black transition hover:brightness-110">
            返回首頁
          </Link>
          <Link href="/game" className="rounded-3xl bg-neonCyan px-6 py-4 text-center text-sm font-bold text-black transition hover:brightness-110">
            前往遊戲頁
          </Link>
        </div>
      </div>
    </main>
  );
}
