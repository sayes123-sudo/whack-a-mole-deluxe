# ASSET_STATUS

本專案已使用內建 GPT Image 2 / Image 2 圖像生成流程建立正式 PNG 遊戲素材，並保存於 `public/assets/images/`。角色、道具、洞口與 Logo 先以純色 chroma-key 背景生成，再以本機 `sharp` 去背成透明 PNG；背景圖保留完整 16:9 raster 圖。

原始 SVG placeholder 仍保留在資料夾中作為備援，不再由正式 UI 使用。

| Asset | Status | Prompt used | Notes |
|---|---|---|---|
| `mole-normal.png` | Final GPT Image 2 asset | A cute arcade game mole character popping up, friendly mischievous expression, rounded shape, premium mobile game asset style, cyberpunk neon rim lighting, clean silhouette, centered composition. | Chroma-key removed to transparent PNG. |
| `mole-hit.png` | Final GPT Image 2 asset | A cute arcade game mole character reacting after being tapped, dizzy stars, funny surprised expression, rounded shape, premium mobile game asset style, cyberpunk neon rim lighting, clean silhouette, centered composition. | Chroma-key removed to transparent PNG. |
| `mole-golden.png` | Final GPT Image 2 asset | A rare golden mole character for a whack-a-mole game, cute and shiny, gold fur, sparkling highlights, premium mobile game icon style, cyberpunk neon rim light, clean silhouette, centered composition. | Chroma-key removed to transparent PNG. |
| `bomb.png` | Final GPT Image 2 asset | A cartoon bomb icon for an arcade whack-a-mole game, black round bomb with short fuse, neon amber warning glow, premium mobile game asset, readable at small size, centered composition. | Chroma-key removed to transparent PNG. |
| `time-bonus.png` | Final GPT Image 2 asset | A glowing time bonus power-up icon for a cyberpunk arcade game, small stopwatch with cyan and gold neon glow, premium mobile game asset style, centered composition. | Chroma-key removed to transparent PNG. |
| `hole.png` | Final GPT Image 2 asset | A stylized arcade game hole for whack-a-mole, dark circular tunnel, subtle purple neon rim, premium mobile game asset, centered composition, readable at small size. | Chroma-key removed to transparent PNG. |
| `logo.png` | Final GPT Image 2 asset | A polished cyberpunk arcade game logo for the exact Traditional Chinese title 「地鼠大作戰 Deluxe」, neon pink and cyan glow, bold readable characters, premium game title design, centered composition. | Chroma-key removed to transparent PNG. |
| `background-arcade.png` | Final GPT Image 2 asset | A cyberpunk arcade game background, dark purple and navy depth, neon particles, subtle perspective grid, soft glowing light beams, polished web game background, high contrast but not too busy, no characters, no title text, no watermark, widescreen 16:9 composition. | Used on the home hero and shared arcade atmosphere. |
