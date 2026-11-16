# FNF Hub

A static fan hub for Friday Night Funkin' mods. Home page shows a grid of mods; clicking one opens its own page (`#/mod/<slug>`) with a play area, info, and related mods. No build step.

## Run locally
Open `index.html` in a browser, or run `python3 -m http.server` in this folder.

## Add a mod
Edit the `ENTRIES` list at the top of `script.js` (a commented template is there). Fields: `slug`, `name`, `author`, `desc`, `long`, `tags`, `controls`, `url`, `embed`, `image`, `color`.

- `embed`: only set it if the owner allows iframe embedding. Empty shows an "Open official page" button.
- `image`: optional thumbnail. Empty shows a colored tile.

## Deploy on GitHub Pages
1. Push these files to the `main` branch of a new repository.
2. Settings > Pages > "Deploy from a branch", choose `main` and `/ (root)`, Save.
3. Your site appears at `https://<your-username>.github.io/<repo-name>/`.

## Notes
Link to official pages instead of re-hosting game files. The base FNF assets are licensed non-commercially, so don't copy them into your repo.
