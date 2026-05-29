# AGENTS.md — Codex Autonomous Build Instructions

## 0. Mission
You are OpenAI Codex acting as the autonomous engineering agent for this repository.
Your mission is to build a production-ready modern Whack-a-Mole web game called **地鼠大作戰 Deluxe** from this starter package through local verification, GitHub version control preparation, and Vercel deployment readiness.

This is **not an MVP**. Do not stop at a simple demo. The final result must feel like a polished arcade casual web game.

## 1. Non-negotiable rules
1. Read this file first, then read:
   - `CODEX_MASTER_PROMPT.md`
   - `CODEX_TASKS.md`
   - `docs/GAME_DESIGN.md`
   - `docs/IMAGE2_PROMPTS.md`
   - `docs/DEPLOYMENT.md`
   - `docs/ACCEPTANCE_CHECKLIST.md`
2. Before changing code, produce a concise execution plan.
3. Follow the requested architecture unless there is a technical reason to change it. If changing it, document why.
4. All visual game assets must be generated with GPT Image 2 / Image 2 workflow. Do not download assets from the internet.
5. If the image generation tool is not available in the active environment, create temporary SVG/CSS placeholders and mark every placeholder clearly in `docs/ASSET_STATUS.md`. Do not claim that placeholders are final assets.
6. Every major feature must be verifiable locally.
7. Keep TypeScript strict and avoid `any` unless justified.
8. The final project must pass:
   - `npm run typecheck`
   - `npm run lint`
   - `npm run build`
9. Do not expose secrets, tokens, API keys, or personal data in the repository.
10. Keep all player-facing text in Traditional Chinese unless there is a deliberate English arcade label such as START, COMBO, GAME OVER.

## 2. Required stack
- Next.js App Router
- React
- TypeScript
- Tailwind CSS v4 using `@tailwindcss/postcss`
- LocalStorage for high score and settings
- Vercel-compatible deployment

## 3. Required final user experience
### Pages
- `/` Home / main menu
- `/game` Main game screen
- `/how-to-play` Optional instructions page or modal
- Not-found page styled consistently

### Home page
Must include:
- Game logo / title: 地鼠大作戰 Deluxe
- Large arcade START button
- Settings entry
- High score display
- Feature cards: target score, bombs, combo, limited time mode
- Cyberpunk / arcade visual language
- Responsive desktop and mobile layout

### Game page
Must include:
- Dynamic mole grid; not locked to exactly nine holes forever
- Level-based layout such as 3x3, 3x4, 4x4
- Score
- High score
- Timer
- Target score
- Lives
- Combo counter
- Level indicator
- Pause/resume
- Restart
- Game over / level clear modal

## 4. Required mechanics
1. Moles randomly appear in holes.
2. Player clicks/taps moles to score.
3. Bombs appear as traps.
4. Clicking bombs causes penalty: lose life and/or score deduction.
5. Golden mole gives bonus score.
6. Optional time bonus gives extra time.
7. Combo increases reward for consecutive hits.
8. Missing or hitting bombs should reset combo.
9. Timer counts down.
10. Level target score determines clear/fail.
11. Difficulty increases with levels.
12. High score saved to LocalStorage.
13. Game must work with mouse and touch.

## 5. Required architecture
Codex may improve the structure, but the final code should be close to:

```txt
src/
  app/
    page.tsx
    game/page.tsx
    how-to-play/page.tsx
    layout.tsx
    globals.css
  components/
    home/
      HomeHero.tsx
      FeatureCards.tsx
    game/
      GameBoard.tsx
      GameCell.tsx
      GameHud.tsx
      GameOverModal.tsx
      PauseOverlay.tsx
      SettingsPanel.tsx
      HowToPlayModal.tsx
    ui/
      ArcadeButton.tsx
      NeonPanel.tsx
  lib/
    gameConfig.ts
    gameEngine.ts
    storage.ts
    sound.ts
    utils.ts
  types/
    game.ts
public/
  assets/
    images/
    audio/
docs/
```

## 6. Visual style
Target: polished arcade/cyberpunk casual game.
- Dark purple/navy background
- Neon pink, cyan, amber accents
- Animated particles and scanline overlay
- Glowing buttons
- Clear high-contrast text
- Large touch-friendly controls
- Cute high-quality mole character style, not scary
- Bomb icon should be clear and readable at small sizes

## 7. GPT Image 2 asset policy
Generate, document, and save final assets under:

```txt
public/assets/images/
```

Required image assets:
- `mole-normal.png`
- `mole-hit.png`
- `mole-golden.png`
- `bomb.png`
- `time-bonus.png`
- `hole.png`
- `logo.png`
- `background-arcade.png` or CSS-only background if stronger
- Optional effect sprites

For every image, record in `docs/ASSET_STATUS.md`:
- filename
- prompt used
- generation status
- whether final or placeholder

## 8. Audio policy
If audio generation or licensed audio is unavailable, create lightweight Web Audio API sound effects in code instead of downloading audio files.
Required sound feedback:
- mole hit
- bomb hit
- combo
- countdown warning
- game over
- level clear

## 9. Git workflow requirements
Codex must prepare the repository for GitHub.
Expected commands for the human operator, unless Codex is authorized to run them:

```bash
git init
git add .
git commit -m "chore: initialize whack-a-mole deluxe"
git branch -M main
git remote add origin <GITHUB_REPO_URL>
git push -u origin main
```

Codex should create meaningful commits if it has permission to execute Git.
Use Conventional Commit style:
- `feat:`
- `fix:`
- `style:`
- `docs:`
- `chore:`

## 10. Vercel deployment requirements
Final project must be ready for Vercel import from GitHub.
Codex must ensure:
- `npm run build` passes
- no required environment variables for basic gameplay
- README includes deployment steps
- Vercel build command: `npm run build`
- Vercel output should use Next.js default

If Codex can deploy directly, it may guide or execute:
- connect GitHub repo to Vercel
- import project
- deploy
- verify production URL

## 11. Completion definition
The task is complete only when:
- All required mechanics work
- UI is polished and responsive
- Assets are generated or clearly tracked as placeholders
- Build passes
- README is updated
- Deployment docs are complete
- Acceptance checklist is completed
- The app can be deployed to Vercel without manual code fixes

## 12. Communication style
When reporting progress to the human operator:
- Be concise
- State what changed
- State what still needs approval
- Ask before destructive actions
- Do not claim deployment is complete unless a production URL is verified
