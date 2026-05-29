# GAME_DESIGN.md — 打地鼠遊戲設計規格

## 1. 核心定位

遊戲名稱：地鼠大作戰 Deluxe  
類型：Arcade / Casual / Reaction Game  
平台：Web, desktop and mobile  
目標：完成可以公開展示與部署的正式版遊戲。

## 2. 玩法核心

玩家在限定時間內點擊隨機出現的地鼠取得分數，同時避開炸彈。達到目標分數即可通關，未達標或生命值歸零則失敗。

## 3. 現代玩法元素

- 多洞口版面，不限九宮格
- 關卡制
- 目標分數
- 炸彈陷阱
- 黃金地鼠
- 時間加成物件
- Combo 連擊
- 生命值
- 高分紀錄
- 音效回饋
- 視覺特效

## 4. 建議關卡

| Level | Grid | Time | Target | Features |
|---|---:|---:|---:|---|
| 1 | 3x3 | 30s | 180 | basic mole + small bomb chance |
| 2 | 3x4 | 35s | 420 | more bombs + golden mole |
| 3 | 4x4 | 40s | 760 | faster spawn + time bonus |
| 4+ | Codex may extend | variable | variable | expert challenge |

## 5. Scoring

- Normal mole: +10
- Golden mole: +50
- Combo bonus: +10%, +20%, +50% based on streak
- Bomb: -30 score and -1 life
- Time bonus: +3 seconds

Codex may tune values, but must keep gameplay fair.

## 6. UX requirements

- START button must be obvious.
- HUD must be readable during fast play.
- Player should understand hit/bomb/time/combo feedback instantly.
- Mobile tapping must be comfortable.
- Game over and level clear states must be clear.

## 7. Visual style

Cyberpunk arcade style:
- dark purple / navy background
- neon pink title
- cyan highlights
- amber warning color
- glass panels
- glow effects
- scanlines
- floating particles
