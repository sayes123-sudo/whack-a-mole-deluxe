import Link from 'next/link';
import LeaderboardPanel from '@/components/game/LeaderboardPanel';
import ScoreGuide from '@/components/game/ScoreGuide';

export default function HowToPlay() {
  return (
    <main className="how-page min-h-screen text-white scanlines">
      <div className="how-shell">
        <section className="how-hero">
          <p className="home-section-label">HOW TO PLAY</p>
          <h1>玩法說明</h1>
          <p>
            地鼠大作戰 Deluxe 是一款結合時間壓力、連擊倍率與陷阱判斷的街機遊戲。每一關都要迅速點擊正確目標，避開炸彈並維持 Combo。
          </p>
          <div className="how-actions">
            <Link href="/game" className="home-button">前往遊戲頁</Link>
            <Link href="/" className="home-secondary">返回首頁</Link>
          </div>
        </section>

        <section className="how-card">
          <p className="home-section-label">分數圖鑑</p>
          <h2>每種圖案代表什麼</h2>
          <ScoreGuide />
        </section>

        <section className="how-grid">
          <div className="how-card">
            <p className="home-section-label">基本規則</p>
            <ul>
              <li>點擊出現的地鼠得分，連擊可提升每次命中獎勵。</li>
              <li>金色地鼠提供更高分數，優先擊中可快速達成目標。</li>
              <li>炸彈會扣命並重置 Combo，請避免誤觸。</li>
              <li>時間獎勵藏在某些洞口，可延長倒數時間。</li>
              <li>若在時間結束前達成目標分數，即可過關並進入下一關。</li>
            </ul>
          </div>
          <div className="how-card">
            <p className="home-section-label">技巧提示</p>
            <ul>
              <li>開局先找出最佳攻擊節奏，不要亂按空洞。</li>
              <li>若 Combo 越高，地鼠分數乘數也會越大。</li>
              <li>最後幾秒請專注於最容易點到的位置。</li>
            </ul>
          </div>
        </section>

        <LeaderboardPanel />
      </div>
    </main>
  );
}
