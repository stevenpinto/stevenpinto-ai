# stevenpinto.com

Personal portfolio site for Steven Pinto. Static HTML/CSS/JS — no build step, no framework.

## Quick Start

1. Edit files directly (`index.html`, `css/style.css`, `js/main.js`)
2. Push to `main` — GitHub Actions deploys automatically to S3/CloudFront

## Project Structure

```
index.html              Main single-page site
linkedin.html           LinkedIn redirect (tracks clicks via GA4)
admin.html              Ask Steve AI feedback admin (not public)
favicon.ico             Site favicon
css/style.css           All styles (dark/light theme)
js/main.js              Animations, scroll, theme toggle, nav
js/steve-ai-widget.js   Ask Steve AI chatbot widget
images/                 Project screenshots and profile photo
.github/workflows/      GitHub Actions deploy pipeline
```

## Deployment

The site deploys to **S3 + CloudFront** via GitHub Actions on push to `main`.

### GitHub Actions Secrets

Add these in your repo under **Settings > Secrets and variables > Actions**:

| Secret | Description |
|--------|-------------|
| `AWS_ROLE_ARN` | ARN of IAM role with GitHub OIDC trust policy |
| `S3_BUCKET` | S3 bucket name to sync files to |
| `CLOUDFRONT_DISTRIBUTION_ID` | CloudFront distribution ID for cache invalidation |

### IAM Role

The IAM role needs:
- A trust policy allowing `token.actions.githubusercontent.com` (GitHub OIDC provider)
- Permissions: `s3:PutObject`, `s3:DeleteObject`, `s3:ListBucket` on your bucket
- Permission: `cloudfront:CreateInvalidation` on your distribution

## Analytics & Tracking

| Tool | Purpose | Setup |
|------|---------|-------|
| **GA4** (`G-3H5ZRCRHN2`) | Page views, referrers, UTM tracking | Configured in `index.html` and `linkedin.html` |
| **Microsoft Clarity** (`w2y8zv15h3`) | Session recordings, heatmaps | Configured in `index.html` |
| **LinkedIn Redirect** | Track resume-to-LinkedIn clicks | Link to `stevenpinto.com/linkedin` on resumes |

### UTM Tracking

Use UTM-tagged URLs to track where traffic comes from in GA4:

| Use Case | URL |
|----------|-----|
| Resume link to site | `https://stevenpinto.com/?utm_source=companyname&utm_medium=resume` |
| Resume link to LinkedIn | `https://stevenpinto.com/linkedin?utm_source=companyname&utm_medium=resume` |
| LinkedIn article | `https://stevenpinto.com/?utm_source=linkedin&utm_medium=social&utm_campaign=article-name` |

- `utm_source` — who sent the traffic (company name or platform)
- `utm_medium` — channel type (`resume` or `social`)
- `utm_campaign` — specific article or campaign name

## Adding/Updating Project Screenshots

1. Save image as `images/{project-name}.jpg` (landscape aspect ratio works best)
2. Reference it in the project card in `index.html`:
   ```html
   <img src="images/{project-name}.jpg" alt="Project Name" loading="lazy" onerror="this.style.display='none'">
   ```
