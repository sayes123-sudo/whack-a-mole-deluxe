import ScoreGuide from '@/components/game/ScoreGuide';

export default function FeatureCards() {
  const cards = [
    { title: '目標分數', description: '每關都有挑戰目標，達成即可晉級。' },
    { title: '炸彈陷阱', description: '炸彈會扣分、扣命，並清空 Combo。' },
    { title: 'Combo 加成', description: '連續成功擊中可提高分數倍率。' },
    { title: '限時模式', description: '時間會倒數，時間獎勵可延長戰局。' },
  ];

  return (
    <section className="home-info">
      <div className="home-rules-panel">
        <p className="home-section-label">分數與陷阱</p>
        <h2>看圖就知道該點誰</h2>
        <ScoreGuide />
      </div>
      <div className="home-feature-grid">
        {cards.map(card => (
          <div key={card.title} className="home-feature-card">
            <div>
              <p>{card.title}</p>
              <span>{card.description}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
