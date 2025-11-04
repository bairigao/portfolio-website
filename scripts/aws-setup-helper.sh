#!/bin/bash

# AWS Portfolio Deployment Helper Script
# This script helps you set up AWS resources for your portfolio

echo "🚀 Portfolio AWS Setup Helper"
echo "=============================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed${NC}"
    echo "Install it from: https://aws.amazon.com/cli/"
    exit 1
fi

echo -e "${GREEN}✅ AWS CLI is installed${NC}"
echo ""

# Get user input
read -p "Enter your S3 bucket name (must be globally unique): " BUCKET_NAME
read -p "Enter AWS region (e.g., us-east-1): " AWS_REGION

echo ""
echo "Creating AWS resources..."
echo ""

# Create S3 bucket
echo "1️⃣ Creating S3 bucket: $BUCKET_NAME"
aws s3 mb s3://$BUCKET_NAME --region $AWS_REGION

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ S3 bucket created${NC}"
else
    echo -e "${RED}❌ Failed to create S3 bucket${NC}"
    exit 1
fi

# Enable static website hosting
echo ""
echo "2️⃣ Enabling static website hosting..."
aws s3 website s3://$BUCKET_NAME --index-document index.html --error-document index.html

# Set bucket policy for public read
echo ""
echo "3️⃣ Setting bucket policy for public access..."
cat > /tmp/bucket-policy.json <<EOF
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
EOF

aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy file:///tmp/bucket-policy.json

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Bucket policy set${NC}"
else
    echo -e "${RED}❌ Failed to set bucket policy${NC}"
fi

# Disable block public access
echo ""
echo "4️⃣ Disabling block public access..."
aws s3api put-public-access-block \
    --bucket $BUCKET_NAME \
    --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

echo ""
echo -e "${GREEN}✅ AWS Setup Complete!${NC}"
echo ""
echo "📝 Next Steps:"
echo "1. Create CloudFront distribution manually in AWS Console"
echo "2. Add GitHub secrets:"
echo "   - AWS_ACCESS_KEY_ID"
echo "   - AWS_SECRET_ACCESS_KEY"
echo "   - AWS_REGION: $AWS_REGION"
echo "   - S3_BUCKET_NAME: $BUCKET_NAME"
echo "   - CLOUDFRONT_DISTRIBUTION_ID (after creating CloudFront)"
echo "   - CLOUDFRONT_DOMAIN (after creating CloudFront)"
echo ""
echo "📖 Full instructions: See DEPLOYMENT.md"
echo ""

# Cleanup
rm -f /tmp/bucket-policy.json

