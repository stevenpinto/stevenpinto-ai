# stevenpinto.com — Personal Portfolio Site

## What This Is
Steven Pinto's personal portfolio website at stevenpinto.com. Static site (vanilla HTML/CSS/JS, no framework) showcasing experience, projects, articles, interests, and an AI chatbot ("Ask Steve AI").

## Project Structure
- `index.html` — Single-page site with all sections (nav, hero, about, experience, projects, articles, interests, Ask Steve AI, contact)
- `css/style.css` — All styles, dark/light theme support
- `js/main.js` — Animations, scroll reveals, theme toggle, navigation
- `js/steve-ai-widget.js` — Ask Steve AI chatbot widget (web component, calls a serverless RAG backend)
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
Each project card has: screenshot image, title, description, tech tags, and optional "Visit Site" link. Images use `object-fit: cover` by default. Landscape screenshots work best for the 180px-tall card image area.

Current projects:
1. **MyHaloBar** — IoT cocktail bar (myhalobar.com)
2. **DevTel Home Intelligence** — Smart home services (devtel.com), vanilla HTML/CSS/JS site
3. **SaaS-Aware** — Shadow IT detection (saas-aware.com), React/Express/MongoDB/ECS Fargate/ALB/Chrome Extension
4. **Ask Steve AI** — RAG chatbot on this site (Claude/LangChain/Pinecone)
5. **Integrations** — Enterprise integration platform (no public link)
6. **Nutrient Dosing System** — IoT hardware project

## Ask Steve AI
Web component chatbot powered by a serverless RAG pipeline:
- API endpoint: `https://aqjiq7s2t8.execute-api.us-east-1.amazonaws.com`
- Stack: Claude, LangChain, Pinecone, Node.js
- Source repo: `c:\Users\steve\Documents\development\steve_ai`

## Visitor Tracking
Three tracking tools are integrated in `index.html`:

### Google Analytics 4
- Measurement ID: `G-3H5ZRCRHN2` (configured in both `index.html` and `linkedin.html`)
- Tracks: page views, referrers, location, device, session duration, UTM parameters

### Microsoft Clarity
- Project ID: `w2y8zv15h3` (configured in `index.html`)
- Provides: session recordings and heatmaps (free, no traffic limits)

### LinkedIn Redirect (`/linkedin`)
- Resume links to `https://stevenpinto.com/linkedin` instead of LinkedIn directly
- `linkedin.html` fires a `linkedin_redirect` GA4 event then redirects to LinkedIn profile
- Tracks which resume submissions result in LinkedIn profile views

### Mailtrack
- **Not a website integration** — install the Mailtrack Chrome extension in Gmail
- Tracks when emailed resumes/messages are opened and how many times
- No code changes needed

## UTM Tracking for Resumes
Use UTM-tagged URLs per company when emailing your resume:
```
https://stevenpinto.com/?utm_source=greenbox&utm_medium=resume
```
GA4 will attribute that visit to the specific company. Use a unique `utm_source` per employer.

## In the Lab Section
Articles about projects Steve is exploring or actively building. Each article lives at `lab/{slug}/index.html`.

Current lab articles:
1. **Local RAG Knowledge Base** (`lab/knowledge-base/`) — Ollama + AnythingLLM
2. **AI Robotic Pruner** (`lab/robotic-pruner/`) — Computer vision + robotics
3. **HaloBar Hardware Build** (`lab/halobar-hardware/`) — Physical automated bartender

### Lab Article Format
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

## Key Conventions
- No build step — edit files directly and push
- All project screenshots go in `images/` as `{project-name}.jpg`
- Dark theme is default (`data-theme="dark"` on html element)
