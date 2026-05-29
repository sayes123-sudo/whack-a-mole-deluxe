export default function FeatureCards() {
  const cards = [
    { title: '目標分數', description: '每關都有挑戰目標，達成即可晉級。' },
    { title: '炸彈陷阱', description: '避開炸彈，否則會失去生命與 Combo。' },
    { title: 'Combo 加成', description: '連續成功擊中可提高分數倍率。' },
    { title: '限時模式', description: '時間會倒數，動作要快才能過關。' },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cards.map(card => (
        <div
          key={card.title}
          className="glass-card flex min-h-[180px] flex-col justify-between rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_18px_60px_rgba(51,255,255,0.12)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(51,255,255,0.18)]"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-neonCyan">{card.title}</p>
            <p className="mt-3 text-white/80">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
