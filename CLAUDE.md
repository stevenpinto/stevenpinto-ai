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
- `linkedin.html` — Redirect page to LinkedIn profile. Used in resume links so GA4 can track LinkedIn clicks before redirecting.

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

## Key Conventions
- No build step — edit files directly and push
- All project screenshots go in `images/` as `{project-name}.jpg`
- Dark theme is default (`data-theme="dark"` on html element)
