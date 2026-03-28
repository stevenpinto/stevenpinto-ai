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

## Deployment
- **Hosting:** AWS S3 + CloudFront
- **Deploy trigger:** Push to `main` branch via GitHub Actions (`.github/workflows/deploy.yml`)
- **Process:** S3 sync → CloudFront invalidation
- **Secrets needed:** `AWS_ROLE_ARN`, `S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID`

## Projects Section
Each project card has: screenshot image, title, description, tech tags, and optional "Visit Site" link. Images use `object-fit: cover; object-position: top` to avoid cropping important content.

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

## Key Conventions
- No build step — edit files directly and push
- All project screenshots go in `images/` as `{project-name}.jpg`
- Dark theme is default (`data-theme="dark"` on html element)
