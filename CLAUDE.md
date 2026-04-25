# stevenpinto.com — Personal Portfolio Site

## What This Is
Steven Pinto's personal portfolio website at stevenpinto.com. Static site (vanilla HTML/CSS/JS, no framework) targeting executive recruiters and hiring managers. Editorial paper/ink/rust design system — Fraunces serif + Inter sans-serif, warm off-white backgrounds, single rust accent color.

## Project Structure
- `index.html` — Single-page site. Section order: Nav → Hero → Stats → Experience → Projects → Lab → Writing → Ask Steve AI → Contact → Footer
- `css/style.css` — All styles. Paper/ink/rust design tokens, Fraunces + Inter fonts, light/dark theme via `data-theme="dark"` on `<html>`
- `js/main.js` — Theme toggle (persists to localStorage, defaults to light), mobile nav toggle
- `js/steve-ai-widget.js` — Ask Steve AI chatbot widget (web component, pill-style toggle button, calls a serverless RAG backend)
- `images/` — Project screenshots and profile photo
- `favicon.ico` — Site favicon (root level)
- `admin.html` — Feedback admin UI (not linked publicly). Enter admin key to view/manage thumbs up/down feedback from Ask Steve AI. API URL is hardcoded to the Lambda endpoint.
- `linkedin/index.html` — Redirect page to LinkedIn profile. Used in resume links so GA4 can track LinkedIn clicks before redirecting.
- `lab/` — "In the Lab" article pages (each project is a `lab/{slug}/index.html` for clean URLs)
- `css/lab-article.css` — Styles for lab article pages

## Deployment
- **Hosting:** AWS S3 + CloudFront
- **Deploy trigger:** Push to `main` branch via GitHub Actions (`.github/workflows/deploy.yml`)
- **Process:** S3 sync → CloudFront invalidation
- **Secrets needed:** `AWS_ROLE_ARN`, `S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID`

## Projects Section
Each project card uses classes: `.proj` (wrapper `<a>` or `<div>`), `.proj__img` (16:10 aspect ratio cover image), `.proj__kind` (label, uppercase small), `.proj__name` (Fraunces serif), `.proj__desc`, `.proj__link` (accent-colored). 3-column grid on desktop, collapses to 2 then 1.

Current projects:
1. **MyHaloBar** — IoT cocktail bar (myhalobar.com)
2. **SaaS-Aware** — Shadow IT detection (saas-aware.com), React/Express/MongoDB/ECS Fargate/ALB/Chrome Extension
3. **DevTel Home Intelligence** — Smart home services (devtel.com), vanilla HTML/CSS/JS site
4. **Ask Steve AI** — RAG chatbot on this site (Claude/LangChain/Pinecone)
5. **Employee Lifecycle Platform** — Enterprise integration platform (no public link)
6. **Nutrient Dosing System** — IoT hardware project

## Ask Steve AI
Web component chatbot powered by a serverless RAG pipeline:
- API endpoint: `https://aqjiq7s2t8.execute-api.us-east-1.amazonaws.com`
- Stack: Claude, LangChain, Pinecone, Node.js
- Source repo: `c:\Users\steve\Documents\development\steve_ai`

## Visitor Tracking
Three tracking tools are integrated in `index.html`:

### Google Analytics 4
- Measurement ID: `G-3H5ZRCRHN2` (configured in `index.html`, `linkedin/index.html`, and all lab article pages)
- Tracks: page views, referrers, location, device, session duration, UTM parameters

### Microsoft Clarity
- Project ID: `w2y8zv15h3` (configured in `index.html` and all lab article pages)
- Provides: session recordings and heatmaps (free, no traffic limits)

### LinkedIn Redirect (`/linkedin`)
- Resume links to `https://stevenpinto.com/linkedin` instead of LinkedIn directly
- `linkedin/index.html` fires a `linkedin_redirect` GA4 event then redirects to LinkedIn profile
- Tracks which resume submissions result in LinkedIn profile views

### Mailtrack
- **Not a website integration** — install the Mailtrack Chrome extension in Gmail
- Tracks when emailed resumes/messages are opened and how many times
- No code changes needed

## UTM Tracking
UTM parameters used across all links:
- `utm_source` — who sent the traffic (company name or platform like `linkedin`, `reddit`)
- `utm_medium` — channel type (`resume` or `social`)
- `utm_campaign` — article or content name (e.g., `halobar-hardware`, `knowledge-base`)
- `utm_content` — optional, specific placement (e.g., `r-homelab`, `r-cocktails`)

Examples:
```
https://stevenpinto.com/?utm_source=companyname&utm_medium=resume
https://stevenpinto.com/linkedin/index.html?utm_source=companyname&utm_medium=resume
https://stevenpinto.com/lab/halobar-hardware/index.html?utm_source=linkedin&utm_medium=social&utm_campaign=halobar-hardware
https://stevenpinto.com/lab/knowledge-base/index.html?utm_source=reddit&utm_medium=social&utm_campaign=knowledge-base&utm_content=r-homelab
```

## In the Lab Section
Articles about projects Steve is exploring or actively building. Each article lives at `lab/{slug}/index.html`.

Current lab articles:
1. **Local RAG Knowledge Base** (`lab/knowledge-base/`) — Ollama + AnythingLLM
2. **AI Robotic Pruner** (`lab/robotic-pruner/`) — Computer vision + robotics
3. **HaloBar Hardware Build** (`lab/halobar-hardware/`) — Physical automated bartender

### Lab Article Format
**CRITICAL: All tags inside `.lab-article-body` must be indented with 8 spaces (matching the div itself). Never mix indentation levels. All `<h2>`, `<p>`, `<ul>`, `<div>` elements must start at the same column. Content inside `<p>` tags goes on its own line.**

Each article page follows this consistent structure:
- **Head:** Links to `../../css/style.css` and `../../css/lab-article.css`, plus GA4 and Clarity tracking scripts
- **Nav:** SP logo linking to `../../`, single nav link: `← Back` linking to `../../#lab`
- **Header:** Status badge, h1 title, subtitle, tech tags (uses existing `.project-tech` styles)
- **Body sections** (using `<h2>` headings, no wrapper divs needed):
  - **The Idea** — What the project is and why it exists
  - **The Stack** — Two-column `lab-spec-grid` with `lab-spec-card` boxes (e.g., Core Stack + Hardware, or Software + Hardware)
  - **Planning / The Approach / How It Started** — Context-dependent narrative section
  - **Execution / Where It Is Now / The Build** — Current state (if actively building)
  - **What I'm Learning / Takeaways** — Optional insights
  - **What's Next** — Bulleted list of upcoming work
  - **Footer:** `lab-article-footer` div with `← Back` link to `../../#lab`
- **Scripts:** Ask Steve AI widget (`../../js/steve-ai-widget.js` + `<steve-ai-widget>` element), then `../../js/main.js`

### HTML Encoding Warning
**CRITICAL: Always use straight ASCII double quotes (`"`) for all HTML attributes. Never use curly/smart quotes (`"` `"`) — they break attribute parsing and CSS stops applying entirely.** This has caused major styling issues (e.g., `class="lab-article-body"` with curly quotes meant the class was never recognized by the browser). If styling looks completely broken on a page, run this check first:
```bash
cat -A lab/{slug}/index.html | grep "M-b"
```
If any lines appear, the file has smart quotes. Fix with:
```bash
sed -i 's/\xe2\x80\x9c/"/g; s/\xe2\x80\x9d/"/g; s/\xe2\x80\x98/'"'"'/g; s/\xe2\x80\x99/'"'"'/g' lab/{slug}/index.html
```
Smart quotes typically get introduced when pasting content from word processors, Google Docs, or AI chat interfaces.

### Writing Style for Articles
- Write in first person, conversational tone
- Avoid em dashes (—), use commas, periods, or parentheses instead
- Keep paragraphs short (2-3 sentences)
- Use `<BR>` after the `lab-spec-grid` closing div for spacing
- Images go in `lab/{slug}/images/` and use `<img>` tags with `loading="lazy"`
- Status badges: `lab-status-planning` (yellow), `lab-status-building` (green), `lab-status-complete` (blue)

### Ask Steve AI Knowledge Base
When creating or updating a lab article, also create/update a corresponding markdown file in the steve_ai project at:
`c:\Users\steve\Documents\development\steve_ai\knowledge-base\public\project-{slug}.md`

These files power the Ask Steve AI chatbot. Include: overview, status, motivation, tech stack, architecture details, approach, key learnings, what's next, and technologies used.

## Design System
CSS custom properties defined in `css/style.css`. Light theme is default (no attribute on `<html>`); dark theme applies when `data-theme="dark"` is set by JS from localStorage.

Key tokens:
- `--paper` / `--paper-2` — background surfaces (warm off-white / slightly darker)
- `--ink` / `--ink-2` / `--ink-3` — text hierarchy (near-black → secondary → tertiary)
- `--rule` / `--rule-soft` — border colors (strong / subtle)
- `--accent` — single rust accent (`#8a3a1a` light, `#d97a4a` dark)
- `--sans` — Inter; `--serif` — Fraunces (loaded from Google Fonts)

Nav class compatibility: lab article pages use `.nav`, `.nav-inner`, `.nav-logo` — these must remain in `style.css`. The main page uses `.nav-brand` for the wordmark. Do not remove `.nav-logo`.

Lab article backward compat classes in `style.css` (do not remove): `.project-tech`, `.project-link`, `.lab-status`, `.lab-status-active`, `.lab-status-building`, `.lab-status-planning`, `.lab-status-complete`.

## Key Conventions
- No build step — edit files directly and push
- All project screenshots go in `images/` as `{project-name}.jpg`
- Light theme is default — JS reads localStorage key `sp-theme`, falls back to `light`
