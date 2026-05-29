# TROUBLESHOOTING.md

## Tailwind / PostCSS error

If the browser shows an error saying Tailwind CSS cannot be used directly as a PostCSS plugin, verify `postcss.config.mjs`:

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

Then install:

```bash
npm install -D @tailwindcss/postcss
```

## npm EACCES cache error on Mac

If npm reports permission denied in `~/.npm/_cacache`:

```bash
npm cache clean --force
sudo chown -R $(whoami) ~/.npm
npm install
```

## localhost refused connection

The dev server is not running. Start it again:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Next.js warning about multiple lockfiles

If Next.js detects more than one `package-lock.json`, keep only the one inside the actual project root.

Example, if terminal is inside the project folder:

```bash
rm ../package-lock.json
npm run dev
```

Only delete the parent lockfile if it was accidentally created outside the project root.
