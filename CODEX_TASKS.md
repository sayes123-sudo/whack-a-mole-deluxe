# CODEX_TASKS.md — Autonomous Phase Plan

## Phase 0 — Project audit
- Read all instruction files.
- Inspect current dependencies and config.
- Confirm Tailwind v4/PostCSS config is correct.
- Run or plan `npm install`.
- Produce a development plan before code changes.

## Phase 1 — App foundation
- Create clean App Router pages.
- Create shared UI components.
- Create reusable game types.
- Create LocalStorage helper.
- Create sound helper using Web Audio API.

Deliverables:
- `/` home page
- `/game` page shell
- shared arcade visual system

## Phase 2 — Game engine
Implement pure game logic in `src/lib/gameEngine.ts` or hooks:
- level config
- grid size per level
- entity spawning
- hit detection
- scoring
- bomb penalty
- combo multiplier
- timer
- lives
- win/loss state

Deliverables:
- deterministic, readable game logic
- no UI-only hacks

## Phase 3 — Game UI
Implement:
- GameBoard
- GameCell
- GameHud
- GameOverModal
- PauseOverlay
- SettingsPanel
- HowToPlayModal

Deliverables:
- playable game page
- mobile-friendly board
- visible feedback for hit/bomb/combo

## Phase 4 — Visual polish
Implement:
- animated neon background
- particles
- scanlines
- button glow
- hit animations
- bomb shake
- combo burst
- responsive spacing

Deliverables:
- polished arcade/cyberpunk visual style

## Phase 5 — Image 2 asset generation
Generate or prepare assets listed in `docs/IMAGE2_PROMPTS.md`.
Save assets to `public/assets/images/`.
Record all statuses in `docs/ASSET_STATUS.md`.

If image generation is unavailable, create CSS/SVG placeholders and clearly mark them as placeholders.

## Phase 6 — Audio and accessibility
- Add Web Audio API sound effects.
- Add mute toggle and store setting.
- Ensure keyboard/touch accessibility.
- Use aria labels for clickable holes.
- Respect reduced motion when possible.

## Phase 7 — Testing and verification
Run:
```bash
npm run typecheck
npm run lint
npm run build
```
Fix all errors.

Test gameplay:
- start game
- score increments
- bomb penalty
- combo
- timer ends game
- high score persists
- level clear works
- mobile layout acceptable

## Phase 8 — GitHub preparation
- Ensure `.gitignore` is correct.
- Update README.
- Provide commit plan.
- If authorized, initialize Git and commit.

## Phase 9 — Vercel deployment readiness
- Verify production build.
- Update `docs/DEPLOYMENT.md`.
- Confirm no env vars required.
- Provide Vercel import instructions.

## Phase 10 — Final handoff
- Complete acceptance checklist.
- Summarize final features.
- List known limitations honestly.
- Provide next recommended improvements.
