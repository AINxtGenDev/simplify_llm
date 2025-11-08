# Repository Guidelines

## Project Structure & Module Organization
- `index.html` is the interactive landing page; keep shared UI elements here so the entry experience stays consistent.
- `modules/01_einfuehrung.html`, `modules/02_tokenisierung.html`, and `modules/03_embeddings.html` are numbered learning modules—add new lessons by following the `NN_topic.html` pattern so cards auto-sort.
- `css/style.css` holds all global styles, tokens, and animations; prefer extending existing utility classes before adding new selectors.
- Static assets live in `assets/`, example datasets or JSON snippets in `data/`, and standalone explainers (`attention_mechanism.html`, `softmax.html`) serve as focused deep dives.

## Build, Test, and Development Commands
- `python3 -m http.server 8000` (run at repo root) previews the site at `http://localhost:8000`; use this during content work to verify navigation and module links.
- `npx prettier --check "**/*.html" "**/*.css"` enforces consistent markup spacing before review; run `--write` to autoformat.
- `npx htmlhint index.html modules/*.html` catches stray tags or accessibility regressions without needing a global install.

## Coding Style & Naming Conventions
- HTML uses 4-space indentation, multi-line attributes for long elements, and emoji-enhanced headings to match the tone already in `index.html`.
- CSS follows 2-space indentation, relies on the custom properties declared in `:root`, and prefers descriptive class names over IDs.
- Name new files and images in lowercase with underscores (`assets/token_plot.png`) and keep module numbers zero-padded so sorting remains lexical.

## Testing Guidelines
- Treat the Python dev server session as the acceptance test: click every card, verify module links, and confirm shared components render identically across pages.
- Lint templates with `npx htmlhint` before committing and fix any warnings immediately; add comments only when explaining non-obvious layout hacks.
- When visuals change, capture a quick screenshot or screen recording while the server runs so reviewers can compare behavior.

## Commit & Pull Request Guidelines
- Follow the existing short, imperative commit style (`"optimize hero gradient"`); keep scope tight so each commit maps to a single content or styling change.
- PRs should describe the affected pages, list manual verification steps (server, lint, screenshots), and link any tracked issues; note outstanding localization or accessibility gaps explicitly.
