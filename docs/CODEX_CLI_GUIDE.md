# CODEX_CLI_GUIDE.md — How to run with OpenAI Codex

This file is a practical guide for the human operator.

## Goal

Use OpenAI Codex / Codex CLI / Codex IDE agent to perform the full project build, not only GitHub Copilot UI edits.

## Recommended starting instruction

Use the full text in `CODEX_MASTER_PROMPT.md`.

## Suggested autonomous workflow

1. Open this folder with the Codex tool.
2. Ask Codex to read `AGENTS.md` first.
3. Ask Codex to inspect the repository.
4. Require Codex to produce a phase plan.
5. Approve the plan.
6. Let Codex implement phase by phase.
7. After each phase, ask Codex to run verification commands.
8. Do not move to GitHub/Vercel until local build passes.

## Operator approvals

Codex should ask before:
- deleting files
- changing dependencies heavily
- running deployment commands
- pushing to GitHub
- connecting to Vercel

## Important distinction

GitHub Copilot Chat inside VS Code is not necessarily the same as OpenAI Codex autonomous workflow. This package is designed for Codex to read and execute from the instruction files.
