import { LEVELS } from '@/lib/gameConfig';

export default function LevelRoadmap({ currentLevel }: { currentLevel: number }) {
  return (
    <section className="level-roadmap">
      <div>
        <p className="side-title">關卡進度</p>
        <p className="level-roadmap-copy">完成目標分數後會進入下一關，格數、速度與陷阱密度會逐步提高。</p>
      </div>
      <div className="level-roadmap-list">
        {LEVELS.map((level) => (
          <div
            className={[
              'level-chip',
              level.level === currentLevel ? 'level-chip-active' : '',
              level.level < currentLevel ? 'level-chip-cleared' : '',
            ].join(' ')}
            key={level.level}
          >
            <strong>LEVEL {level.level}</strong>
            <span>{level.rows} x {level.columns} · {level.targetScore} 分</span>
          </div>
        ))}
      </div>
    </section>
  );
}
