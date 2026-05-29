# DEPLOYMENT.md — GitHub and Vercel Deployment

## 1. Local verification

Run these before pushing or importing into Vercel:

```bash
npm install
npm run typecheck
npm run lint
npm run build
```

`npm run verify` runs the same verification chain.

## 2. GitHub setup

If this is a new local project:

```bash
git init
git add .
git commit -m "chore: initialize whack-a-mole deluxe"
git branch -M main
git remote add origin <GITHUB_REPO_URL>
git push -u origin main
```

If Git is already initialized:

```bash
git status
git remote -v
git log --oneline -5
```

The repository includes `.github/workflows/ci.yml`, which runs:

- `npm ci`
- `npm run typecheck`
- `npm run lint`
- `npm run build`

## 3. Vercel deployment

Recommended flow:

1. Open Vercel and import the GitHub repository.
2. Framework preset: `Next.js`.
3. Install command: `npm install` or Vercel default.
4. Build command: `npm run build`.
5. Output directory: default Next.js setting.
6. Environment variables: none required for gameplay.
7. Deploy.
8. Verify the production URL on desktop and mobile.

## 4. Vercel CLI optional path

If Vercel CLI is installed and the operator is logged in:

```bash
vercel
vercel --prod
```

If the CLI asks for authentication, project linking, or account selection, that step requires human authorization.

## 5. Deployment checklist

- [x] `npm run build` passes locally.
- [x] No required environment variables.
- [x] GitHub CI workflow exists.
- [ ] GitHub repo has latest commit.
- [ ] Vercel project imported successfully.
- [ ] Production URL opens.
- [ ] Game is playable on deployed URL.
- [ ] Mobile layout tested on deployed URL.
