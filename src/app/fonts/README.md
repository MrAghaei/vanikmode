# Fonts — not committed

This folder holds the real `Liana FD` font files (`.ttf`) copied from `reference/fonts/`, used by `src/app/layout.tsx` via `next/font/local`.

These are a **paid commercial font** (fontiran.com) scraped from vanikmode.com's own stylesheet. Per the licensing decision recorded in `tasks.md`, they are used **local-only**:

- never commit the `.ttf` files here (see `.gitignore`)
- never deploy a build that bundles them to a public URL

If you're setting this project up fresh, copy the files back in before running `next dev`:

```sh
cp reference/fonts/*.ttf src/app/fonts/
```
