# AWS Portfolio Deployment Helper Script (PowerShell)
# This script helps you set up AWS resources for your portfolio

Write-Host "🚀 Portfolio AWS Setup Helper" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host ""

# Check if AWS CLI is installed
try {
    aws --version | Out-Null
    Write-Host "✅ AWS CLI is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ AWS CLI is not installed" -ForegroundColor Red
    Write-Host "Install it from: https://aws.amazon.com/cli/"
    exit 1
}

Write-Host ""

# Get user input
$BUCKET_NAME = Read-Host "Enter your S3 bucket name (must be globally unique)"
$AWS_REGION = Read-Host "Enter AWS region (e.g., us-east-1)"

Write-Host ""
Write-Host "Creating AWS resources..." -ForegroundColor Yellow
Write-Host ""

# Create S3 bucket
Write-Host "1️⃣ Creating S3 bucket: $BUCKET_NAME"
aws s3 mb s3://$BUCKET_NAME --region $AWS_REGION

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ S3 bucket created" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to create S3 bucket" -ForegroundColor Red
    exit 1
}

# Enable static website hosting
Write-Host ""
Write-Host "2️⃣ Enabling static website hosting..."
aws s3 website s3://$BUCKET_NAME --index-document index.html --error-document index.html

# Set bucket policy for public read
Write-Host ""
Write-Host "3️⃣ Setting bucket policy for public access..."
$policyJson = @"
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::${BUCKET_NAME}/*"
    }
  ]
}
"@

$policyFile = "$env:TEMP\bucket-policy.json"
$policyJson | Out-File -FilePath $policyFile -Encoding UTF8

aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file:///$policyFile

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Bucket policy set" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to set bucket policy" -ForegroundColor Red
}

# Disable block public access
Write-Host ""
Write-Host "4️⃣ Disabling block public access..."
aws s3api put-public-access-block `
    --bucket $BUCKET_NAME `
    --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

Write-Host ""
Write-Host "✅ AWS Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Create CloudFront distribution manually in AWS Console"
Write-Host "2. Add GitHub secrets:"
Write-Host "   - AWS_ACCESS_KEY_ID"
Write-Host "   - AWS_SECRET_ACCESS_KEY"
Write-Host "   - AWS_REGION: $AWS_REGION"
Write-Host "   - S3_BUCKET_NAME: $BUCKET_NAME"
Write-Host "   - CLOUDFRONT_DISTRIBUTION_ID (after creating CloudFront)"
Write-Host "   - CLOUDFRONT_DOMAIN (after creating CloudFront)"
Write-Host ""
Write-Host "📖 Full instructions: See DEPLOYMENT.md" -ForegroundColor Yellow
Write-Host ""

# Cleanup
Remove-Item -Path $policyFile -ErrorAction SilentlyContinue

