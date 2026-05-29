# ACCEPTANCE_CHECKLIST.md

Codex must complete this checklist before final handoff.

## App structure
- [x] `/` home page exists and is polished.
- [x] `/game` page exists and is playable.
- [x] Components are organized clearly.
- [x] TypeScript types are meaningful.

## Gameplay
- [x] Game starts from menu.
- [x] Moles spawn randomly.
- [x] Grid can support more than 3x3.
- [x] Clicking mole adds score.
- [x] Bombs appear.
- [x] Clicking bomb triggers penalty.
- [x] Golden mole bonus works.
- [x] Time bonus works or is explicitly deferred with reason.
- [x] Combo works.
- [x] Timer works.
- [x] Target score clear works.
- [x] Game over works.
- [x] High score persists.
- [x] Restart works.
- [x] Pause/resume works.

## Visual and UX
- [x] Arcade/cyberpunk style is consistent.
- [x] Text is readable.
- [x] Buttons are touch-friendly.
- [x] Mobile layout works.
- [x] Hit feedback is visible.
- [x] Bomb feedback is clear.
- [x] Reduced motion considered.

## Assets
- [x] Image 2 prompts documented.
- [x] Final assets generated or placeholders clearly marked.
- [x] No downloaded web assets used.
- [x] Asset status updated.

## Audio
- [x] Hit sound.
- [x] Bomb sound.
- [x] Combo sound.
- [x] Game over sound.
- [x] Mute toggle.

## Engineering
- [x] `npm run typecheck` passes.
- [x] `npm run lint` passes.
- [x] `npm run build` passes.
- [x] No secrets committed.
- [x] README updated.
- [x] Deployment docs updated.

## Deployment
- [x] Git instructions complete.
- [x] Vercel instructions complete.
- [x] Production build verified.
