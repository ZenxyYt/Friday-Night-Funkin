# FNF Hub

A static fan hub for Friday Night Funkin' games and mods. No build step.

## Run locally
Open `index.html` in a browser, or run `python3 -m http.server` in this folder.

## Add games or mods
Edit the `ENTRIES` list at the top of `script.js`. Add an `embed` URL only if the owner allows iframe embedding.

## Deploy on GitHub Pages
1. Create a new repository and push these files to the `main` branch.
2. In the repo go to Settings > Pages.
3. Under "Build and deployment", choose "Deploy from a branch", pick `main` and `/ (root)`, then Save.
4. Your site appears at `https://<your-username>.github.io/<repo-name>/` after a minute.

## Notes
Link to official pages instead of re-hosting game files. The base FNF assets are licensed non-commercially, so don't copy them into your repo.
