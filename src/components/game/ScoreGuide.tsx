import Image from 'next/image';

const scoreItems = [
  {
    image: '/assets/images/mole-normal.png',
    name: '普通地鼠',
    score: '+10 分',
    note: '連擊越高，分數倍率越高。',
    tone: 'score-plus',
  },
  {
    image: '/assets/images/mole-golden.png',
    name: '黃金地鼠',
    score: '+50 分',
    note: '稀有高分目標，優先點擊。',
    tone: 'score-gold',
  },
  {
    image: '/assets/images/time-bonus.png',
    name: '時間獎勵',
    score: '+15 分 / +3 秒',
    note: '延長倒數，適合最後衝刺。',
    tone: 'score-time',
  },
  {
    image: '/assets/images/bomb.png',
    name: '炸彈陷阱',
    score: '-30 分 / -1 命',
    note: '會清空 Combo，請避開。',
    tone: 'score-minus',
  },
  {
    image: '/assets/images/hole.png',
    name: '空洞',
    score: 'Combo 歸零',
    note: '亂點會失去連擊節奏。',
    tone: 'score-neutral',
  },
];

export default function ScoreGuide({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'score-guide score-guide-compact' : 'score-guide'}>
      {scoreItems.map((item) => (
        <div className="score-guide-card" key={item.name}>
          <div className="score-guide-icon">
            <Image src={item.image} alt="" width={64} height={64} className="score-guide-img" />
          </div>
          <div className="score-guide-copy">
            <p className="score-guide-name">{item.name}</p>
            <p className={`score-guide-score ${item.tone}`}>{item.score}</p>
            {!compact ? <p className="score-guide-note">{item.note}</p> : null}
          </div>
        </div>
      ))}
    </div>
  );
}
