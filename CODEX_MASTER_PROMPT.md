# CODEX_MASTER_PROMPT.md

Copy this prompt into OpenAI Codex / Codex CLI / Codex IDE agent when starting the real autonomous task.

```text
You are Codex operating on this repository.

This project is a formal autonomous build assignment. Do not treat it as a small UI edit.

First, read all project instructions:
- AGENTS.md
- CODEX_TASKS.md
- docs/GAME_DESIGN.md
- docs/IMAGE2_PROMPTS.md
- docs/DEPLOYMENT.md
- docs/ACCEPTANCE_CHECKLIST.md
- package.json
- current src structure

Goal:
Build a production-ready modern Whack-a-Mole web game named 「地鼠大作戰 Deluxe」.

Scope:
1. Create the complete game UI and gameplay.
2. Implement level-based mole grids, not only a fixed nine-hole board.
3. Add timer, score, high score, target score, lives, combo, bombs, golden mole, time bonus, pause, restart, game over, and level clear.
4. Generate or plan all image assets with GPT Image 2 / Image 2. Do not use downloaded web assets.
5. Use Web Audio API or generated audio for sound effects. Do not download unlicensed audio.
6. Make the game responsive for desktop and mobile.
7. Verify locally with npm install, npm run typecheck, npm run lint, npm run build.
8. Prepare GitHub version control instructions.
9. Prepare Vercel deployment and verification instructions.
10. Complete docs/ACCEPTANCE_CHECKLIST.md.

Important:
Before modifying files, present your full execution plan.
After I approve, work through CODEX_TASKS.md phase by phase.
Do not stop after MVP. The final state must be deployable and presentation-ready.
```
