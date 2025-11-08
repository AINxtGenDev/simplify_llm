# simplify_llm

A bilingual-friendly training project that explains how a Large Language Model works using the guiding question **"Welche Farbe hat der Himmel?"**. Trainers get ready-to-use lesson pages in German, learners can explore the pipeline from tokenization to softmax with interactive animations, and contributors can extend the curriculum without spinning up a backend.

## Project Highlights
- **Step-by-step storyline** – Each module adds one stage of the LLM pipeline so officers (or any newcomers) can connect concepts to the same anchor sentence.
- **Responsive HTML/CSS only** – Everything is a static site, so `python3 -m http.server 8000` is all you need for previews.
- **Deep-dive demos** – Rich animations for Attention and Softmax live in `modules/attention_mechanism.html` and `modules/softmax.html` and are embedded inside their parent lessons.
- **Contributor guardrails** – Coding conventions, linting commands, and review expectations are documented in `AGENTS.md`.

## Repository Structure
```
├── index.html                 # Landing page & module cards
├── modules/
│   ├── 01_einfuehrung.html    # Einführung (German content)
│   ├── 02_tokenisierung.html  # Tokenisierung walkthrough
│   ├── 03_embeddings.html     # Embeddings & Vektor-Visualisierung
│   ├── 04_attention.html      # Attention lesson + embedded animation
│   ├── 05_softmax.html        # Softmax lesson + dark-mode playground
│   ├── attention_mechanism.html # Interactive Q/K/V demo (embedded)
│   └── softmax.html           # Advanced Softmax & sampling playground
├── css/style.css              # Global theme, typography, utilities
├── data/vocabulary.json       # Simplified vocab + embeddings used in examples
├── assets/                    # Placeholder for figures/video exports
└── AGENTS.md                  # Contributor guide (English-only by design)
```
_All HTML modules stay in German. Docs like this README and `AGENTS.md` remain in English for contributors._

## Run the Site Locally
```bash
python3 -m http.server 8000
```
- Run from the repo root and open [http://localhost:8000](http://localhost:8000).
- Test every card and iframe (Attention & Softmax) before sharing new content.

### Optional Tooling
```bash
npx prettier --check "**/*.html" "**/*.css"   # format check (use --write to fix)
npx htmlhint index.html modules/*.html          # catch broken markup & a11y issues
```
Prettier/HTMLHint only require Node.js; install locally or via `npx` as shown.

## Content Authoring Tips
1. **Follow the numbering pattern** `NN_topic.html` so new modules auto-align on the landing page.
2. **Reuse components** – Extend classes in `css/style.css` instead of introducing ad-hoc styles.
3. **German copy only inside HTML** – keep tone instructional, break dense paragraphs into short blocks, and lean on emoji headers sparingly (see existing modules for style).
4. **Use `data/vocabulary.json`** if you need consistent IDs/embeddings for future examples.
5. **Media placeholders** – `modules/04_attention.html` and `modules/05_softmax.html` already contain sections where you can embed exported PPT images or short MP4/WebM clips.

## Testing Checklist
- ✅ Preview via local server and exercise all navigation links.
- ✅ Validate HTML with `htmlhint` and ensure Prettier reports no formatting drift.
- ✅ When visuals change, capture a quick screenshot or short recording for reviewers (especially for the interactive attention/softmax apps).

## Contributing
1. Create a topic branch (`feature/<short-description>`).
2. Make focused commits with imperative subject lines (e.g., `"add attention module"`).
3. Update or extend `AGENTS.md` if you adjust contributor expectations.
4. In pull requests, include:
   - Summary of affected modules/pages
   - Verification steps (server + lint commands run)
   - Screenshots or clips for UI/animation tweaks

Need help? Start with `AGENTS.md` for a deeper look at project conventions and review expectations.
