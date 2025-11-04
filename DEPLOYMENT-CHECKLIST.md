# ✅ AWS Deployment Checklist

Use this checklist to deploy your portfolio to AWS. Check off each step as you complete it.

## 📋 Pre-Deployment

- [ ] AWS account created (free tier eligible)
- [ ] GitHub account with repository access
- [ ] AWS CLI installed (optional, for helper scripts)
- [ ] Node.js 18+ installed locally

## 🏗️ AWS Setup (20 minutes)

### S3 Configuration
- [ ] Created S3 bucket with unique name
- [ ] Enabled "Static website hosting"
- [ ] Set index document to `index.html`
- [ ] Set error document to `index.html`
- [ ] Disabled "Block all public access"
- [ ] Added bucket policy for public read access
- [ ] Noted bucket name: `_________________`

### CloudFront Configuration
- [ ] Created CloudFront distribution
- [ ] Selected S3 bucket as origin
- [ ] Set up origin access control
- [ ] Enabled "Redirect HTTP to HTTPS"
- [ ] Set default root object to `index.html`
- [ ] Added custom error response: 403 → /index.html (200)
- [ ] Added custom error response: 404 → /index.html (200)
- [ ] Waited for distribution to deploy (10-15 min)
- [ ] Noted distribution ID: `_________________`
- [ ] Noted CloudFront domain: `_________________`

### IAM User Setup
- [ ] Created IAM user: `github-actions-deploy`
- [ ] Attached policy: `AmazonS3FullAccess`
- [ ] Attached policy: `CloudFrontFullAccess`
- [ ] Saved Access Key ID: `_________________`
- [ ] Saved Secret Access Key: `_________________` (keep secure!)

## 🔐 GitHub Configuration (5 minutes)

- [ ] Went to GitHub repo → Settings → Secrets → Actions
- [ ] Added secret: `AWS_ACCESS_KEY_ID`
- [ ] Added secret: `AWS_SECRET_ACCESS_KEY`
- [ ] Added secret: `AWS_REGION` (e.g., us-east-1)
- [ ] Added secret: `S3_BUCKET_NAME`
- [ ] Added secret: `CLOUDFRONT_DISTRIBUTION_ID`
- [ ] Added secret: `CLOUDFRONT_DOMAIN`
- [ ] Enabled GitHub Actions

## 📝 Content Setup (10 minutes)

- [ ] Reviewed `frontend/src/data/skills.json`
- [ ] Reviewed `frontend/src/data/projects.json`
- [ ] Reviewed `frontend/src/data/experiences.json`
- [ ] Updated personal info in `frontend/src/components/QuickLinks.jsx`
- [ ] Updated hero text in `frontend/src/components/Hero.jsx`
- [ ] (Optional) Added resume PDF to `frontend/public/`
- [ ] (Optional) Updated resume link in `Portfolio.jsx`

## 🚀 First Deployment (5 minutes)

- [ ] Committed all changes
- [ ] Pushed to `main` branch
- [ ] Checked GitHub Actions tab (should see workflow running)
- [ ] Waited for deployment to complete (~3-5 minutes)
- [ ] Visited CloudFront URL to verify
- [ ] Confirmed website loads correctly
- [ ] Tested all sections (Skills, Projects, Experience)
- [ ] Tested responsive design on mobile

## ✨ Post-Deployment Verification

### Functionality Tests
- [ ] Homepage loads
- [ ] Skills modal opens and displays data
- [ ] Projects modal opens and displays data
- [ ] Experience modal opens and displays data
- [ ] Social links work
- [ ] Contact button works
- [ ] All images load
- [ ] No console errors

### Performance Tests
- [ ] Page loads in < 3 seconds
- [ ] Images are optimized
- [ ] No broken links

### Browser Compatibility
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari (if available)
- [ ] Tested on mobile device

## 🎯 Optional Enhancements

- [ ] Set up custom domain with Route 53
- [ ] Add SSL certificate (AWS Certificate Manager)
- [ ] Set up Google Analytics
- [ ] Add contact form with AWS Lambda
- [ ] Create social media preview images
- [ ] Add favicon
- [ ] Set up monitoring with CloudWatch

## 📊 Cost Verification

- [ ] Checked AWS billing dashboard
- [ ] Confirmed using free tier
- [ ] Set up billing alert for > $1

## 📱 Share Your Portfolio

- [ ] Updated LinkedIn profile URL
- [ ] Updated GitHub profile
- [ ] Updated resume with portfolio URL
- [ ] Shared on social media
- [ ] Added to email signature

## 🔄 Regular Maintenance

### Monthly
- [ ] Review AWS free tier usage
- [ ] Check for security updates
- [ ] Update portfolio content as needed

### When Updating Content
- [ ] Edit JSON files using `admin-tool.html`
- [ ] Test locally with `npm run dev`
- [ ] Commit and push changes
- [ ] Verify deployment in GitHub Actions
- [ ] Check live site

## 🆘 Troubleshooting Guide

If something doesn't work:

### Website shows 403 error
- [ ] Verified bucket policy is correct
- [ ] Confirmed "Block public access" is off
- [ ] Checked CloudFront origin settings

### Changes not appearing
- [ ] Waited 5-10 minutes for CloudFront cache
- [ ] Tried hard refresh (Ctrl+Shift+R)
- [ ] Checked GitHub Actions completed successfully
- [ ] Manually invalidated CloudFront cache

### GitHub Actions failing
- [ ] Verified all secrets are set correctly
- [ ] Checked AWS credentials are valid
- [ ] Reviewed GitHub Actions logs
- [ ] Confirmed S3 bucket name is correct

### Build errors locally
- [ ] Ran `npm install` in frontend directory
- [ ] Checked Node.js version (18+)
- [ ] Cleared node_modules and reinstalled
- [ ] Checked for JSON syntax errors in data files

## 🎉 Completion

- [ ] Portfolio is live and working
- [ ] Deployment pipeline is automated
- [ ] Bookmarked AWS CloudFront URL
- [ ] Documented any custom changes
- [ ] Celebrated! 🎊

---

## 📞 Need Help?

- Documentation: See `DEPLOYMENT.md` and `README.md`
- GitHub Actions logs: Check Actions tab in repository
- AWS Support: Use AWS Support Center (requires support plan)

---

**Deployment Date**: _________________  
**CloudFront URL**: _________________  
**Custom Domain** (if any): _________________

---

**🎯 Your portfolio is now live and automatically deploys on every push to main!**

