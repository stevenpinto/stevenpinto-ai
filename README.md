# stevenpinto.com

Personal portfolio site for Steven Pinto. Static HTML/CSS/JS with embedded Ask Steve AI chatbot widget.

## Deploying

The site deploys to S3/CloudFront via GitHub Actions on push to `main`.

### GitHub Actions Secrets

Add these in your repo under Settings → Secrets and variables → Actions:

- `AWS_ROLE_ARN` — the ARN of your IAM role with a trust policy for GitHub OIDC (e.g., `arn:aws:iam::123456789012:role/YourRoleName`)
- `S3_BUCKET` — the S3 bucket name to sync files to
- `CLOUDFRONT_DISTRIBUTION_ID` — the CloudFront distribution ID for cache invalidation

### IAM Role

The IAM role needs:
- A trust policy allowing `token.actions.githubusercontent.com` (GitHub OIDC provider)
- Permissions for `s3:PutObject`, `s3:DeleteObject`, `s3:ListBucket` on your bucket
- Permission for `cloudfront:CreateInvalidation` on your distribution
