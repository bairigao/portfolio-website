# 🚀 Portfolio Website - AWS Deployment Guide

This guide will help you deploy your static portfolio website to AWS S3 + CloudFront with automatic GitHub Actions deployment.

## 📋 Table of Contents
- [Prerequisites](#prerequisites)
- [AWS Setup](#aws-setup)
- [GitHub Setup](#github-setup)
- [Updating Content](#updating-content)
- [Local Development](#local-development)
- [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

1. **AWS Account** (Free tier eligible)
2. **GitHub Account**
3. **Node.js 18+** installed locally
4. **Git** installed

---

## 🏗️ AWS Setup

### Step 1: Create S3 Bucket

1. Go to [AWS S3 Console](https://s3.console.aws.amazon.com/)
2. Click "Create bucket"
3. **Bucket name**: `your-portfolio-bucket-name` (must be unique globally)
4. **Region**: Choose closest to your audience (e.g., `us-east-1`)
5. **Block Public Access**: UNCHECK "Block all public access" ⚠️
6. Click "Create bucket"

### Step 2: Enable Static Website Hosting

1. Click on your bucket name
2. Go to **Properties** tab
3. Scroll to **Static website hosting**
4. Click "Edit"
5. Select "Enable"
6. **Index document**: `index.html`
7. **Error document**: `index.html` (for React Router)
8. Click "Save changes"

### Step 3: Set Bucket Policy

1. Go to **Permissions** tab
2. Scroll to **Bucket policy**
3. Click "Edit"
4. Paste this policy (replace `YOUR-BUCKET-NAME`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::lis-portfolio-website/*"
    }
  ]
}
```

### Step 4: Create CloudFront Distribution

1. Go to [CloudFront Console](https://console.aws.amazon.com/cloudfront/)
2. Click "Create distribution"
3. **Origin domain**: Select your S3 bucket from dropdown
4. **Origin access**: Choose "Origin access control settings (recommended)"
5. Click "Create control setting" if prompted
6. **Viewer protocol policy**: "Redirect HTTP to HTTPS"
7. **Allowed HTTP methods**: GET, HEAD
8. **Cache policy**: "CachingOptimized"
9. **Default root object**: `index.html`
10. **Custom error responses** (for React Router):
    - Click "Create custom error response"
    - **HTTP error code**: 403
    - **Customize error response**: Yes
    - **Response page path**: `/index.html`
    - **HTTP response code**: 200
    - Repeat for error code 404
11. Click "Create distribution"
12. **Wait 10-15 minutes** for distribution to deploy
13. **Note your CloudFront domain** (e.g., `d1234567890.cloudfront.net`)

### Step 5: Create IAM User for GitHub Actions

1. Go to [IAM Console](https://console.aws.amazon.com/iam/)
2. Click "Users" → "Add users"
3. **User name**: `github-actions-deploy`
4. Select "Access key - Programmatic access"
5. Click "Next: Permissions"
6. Click "Attach policies directly"
7. Search and select:
   - `AmazonS3FullAccess`
   - `CloudFrontFullAccess`
8. Click "Next" → "Create user"
9. **Download credentials** or copy:
   - Access Key ID
   - Secret Access Key
10. ⚠️ **Save these securely** - you can't view the secret again!

---

## 🔐 GitHub Setup

### Step 1: Add GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click "New repository secret" for each:

| Secret Name | Value | Example |
|------------|-------|---------|
| `AWS_ACCESS_KEY_ID` | Your IAM access key | `AKIAIOSFODNN7EXAMPLE` |
| `AWS_SECRET_ACCESS_KEY` | Your IAM secret key | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `AWS_REGION` | Your AWS region | `us-east-1` |
| `S3_BUCKET_NAME` | Your S3 bucket name | `your-portfolio-bucket-name` |
| `CLOUDFRONT_DISTRIBUTION_ID` | Your CloudFront ID | `E1234567890ABC` |
| `CLOUDFRONT_DOMAIN` | Your CloudFront domain | `d1234567890.cloudfront.net` |

### Step 2: Enable GitHub Actions

1. Go to **Actions** tab in your repository
2. Click "I understand my workflows, go ahead and enable them"
3. The workflow will automatically run on next push to `main` branch

---

## 📝 Updating Content

### Method 1: Using Admin Tool (Recommended)

1. Open `admin-tool.html` in your browser
2. Edit Skills, Projects, or Experience
3. Click "Download JSON"
4. Replace the file in `frontend/src/data/`
5. Commit and push:

```bash
git add frontend/src/data/*.json
git commit -m "Update portfolio content"
git push origin main
```

### Method 2: Edit JSON Directly

1. Edit files in `frontend/src/data/`:
   - `skills.json`
   - `projects.json`
   - `experiences.json`
2. Commit and push changes
3. GitHub Actions will automatically deploy

### JSON Format Examples

**Skills:**
```json
[
  {
    "id": 1,
    "name": "Python",
    "level": "Advanced",
    "description": "Flask, Django for backend",
    "icon_name": "python"
  }
]
```

**Projects:**
```json
[
  {
    "id": 1,
    "title": "My Project",
    "description": "Point 1|Point 2|Point 3",
    "tech_stack": "react,python,aws",
    "github_url": "https://github.com/user/repo",
    "color": "text-blue-400"
  }
]
```

**Experience:**
```json
[
  {
    "id": 1,
    "title": "Software Developer",
    "company": "Tech Corp",
    "date": "2022 - Present",
    "description": "Task 1|Task 2|Task 3",
    "highlights": "Skills · Tech · Impact"
  }
]
```

### Personal Info (QuickLinks)

Edit `frontend/src/components/QuickLinks.jsx`:
- Line 16-21: Education
- Line 22-27: Highlights
- Line 28-34: Skills
- Line 37-40: Social links

---

## 💻 Local Development

### Initial Setup

```bash
cd frontend
npm install
```

### Run Development Server

```bash
npm run dev
```

Visit: http://localhost:5173

### Build for Production

```bash
npm run build
```

### Test Production Build Locally

```bash
npm run preview
```

---

## 🐳 Docker (Optional)

### Build Docker Image

```bash
docker build -t portfolio-website .
```

### Run Docker Container

```bash
docker run -d -p 8080:80 portfolio-website
```

Visit: http://localhost:8080

---

## 🔍 Troubleshooting

### Issue: GitHub Action fails

**Check:**
1. All secrets are correctly set in GitHub
2. S3 bucket name is correct
3. CloudFront distribution ID is correct
4. IAM user has correct permissions

### Issue: Website shows 403 error

**Solutions:**
1. Check S3 bucket policy is set correctly
2. Ensure "Block all public access" is OFF
3. Verify CloudFront origin access is configured

### Issue: Changes not showing

**Solutions:**
1. Wait 5-10 minutes for CloudFront cache to clear
2. Hard refresh browser (Ctrl+Shift+R)
3. Check GitHub Actions completed successfully
4. Manually invalidate CloudFront cache:
   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
   ```

### Issue: React Router shows 404

**Solution:**
Ensure CloudFront custom error responses are set:
- 403 → /index.html (200)
- 404 → /index.html (200)

---

## 💰 AWS Free Tier Limits

| Service | Free Tier | Typical Usage |
|---------|-----------|---------------|
| **S3** | 5 GB storage, 20,000 GET requests | ~2 GB ✅ |
| **CloudFront** | 50 GB data transfer out, 2M HTTP requests | ~10 GB ✅ |
| **Total Cost** | **$0/month** for typical portfolio | ✅ FREE |

⚠️ **Note:** After 12 months, costs are minimal (~$1-2/month for a portfolio site)

---

## 🎯 Next Steps

1. ✅ Complete AWS setup
2. ✅ Add GitHub secrets
3. ✅ Push to main branch
4. ✅ Wait for deployment (~5 minutes)
5. ✅ Visit your CloudFront URL
6. 🎉 Your portfolio is live!

### Optional Enhancements

- **Custom Domain**: Route 53 + SSL Certificate
- **Analytics**: AWS CloudWatch or Google Analytics
- **Contact Form**: AWS Lambda + API Gateway
- **Resume**: Add PDF to `public` folder

---

## 📞 Support

If you encounter issues:
1. Check GitHub Actions logs
2. Review AWS CloudWatch logs
3. Verify all configuration steps above

---

**Made with ❤️ by Si Li**

Last updated: November 2025

