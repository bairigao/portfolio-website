# 🎨 Portfolio Website

> Modern, responsive portfolio website built with React + Vite, deployed on AWS S3 + CloudFront

[![Deploy Status](https://github.com/bairigao/portfolio-website/actions/workflows/deploy-to-aws.yml/badge.svg)](https://github.com/bairigao/portfolio-website/actions)

## ✨ Features

- 🚀 **Static Site** - Fast, secure, and scalable
- ⚡ **React + Vite** - Modern development experience
- 🎨 **Tailwind CSS** - Beautiful, responsive design
- 🔄 **Auto-Deploy** - Push to GitHub → Deploy to AWS
- 📝 **Easy Updates** - Simple JSON files for content
- 🐳 **Docker Ready** - Containerized for any platform
- 💰 **AWS Free Tier** - $0/month hosting cost

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/bairigao/portfolio-website.git
cd portfolio-website
cd frontend
npm install
```

### 2. Run Locally

```bash
npm run dev
```

Visit: http://localhost:5173

### 3. Update Content

Open `admin-tool.html` in browser or edit JSON files directly:
- `frontend/src/data/skills.json`
- `frontend/src/data/projects.json`
- `frontend/src/data/experiences.json`

### 4. Deploy to AWS


Quick version:
1. Set up AWS S3 + CloudFront
2. Add GitHub secrets
3. Push to main branch
4. ✨ Auto-deployed!

## 📁 Project Structure

```
portfolio-website/
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── data/          # Content JSON files ⭐
│   │   ├── styles/        # CSS styles
│   │   └── utils/         # Utility functions
│   └── package.json
├── .github/
│   └── workflows/
│       └── deploy-to-aws.yml  # GitHub Actions CI/CD
├── Dockerfile             # Docker configuration
├── nginx.conf            # Nginx configuration
├── admin-tool.html       # Local content editor
├── DEPLOYMENT.md         # Deployment guide
└── README.md             # This file
```

## 🎯 Key Files to Edit

| File | Purpose |
|------|---------|
| `frontend/src/data/*.json` | Portfolio content |
| `frontend/src/components/QuickLinks.jsx` | Personal info & social links |
| `frontend/src/components/Hero.jsx` | Main heading & intro |
| `public/resume.pdf` | Resume file (add yours) |

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Docker
docker build -t portfolio .
docker run -p 8080:80 portfolio
```

## 📝 Content Management

### Method 1: Admin Tool (Easy)
1. Open `admin-tool.html`
2. Edit content
3. Download JSON
4. Replace files in `frontend/src/data/`
5. Commit & push

### Method 2: Direct Edit
1. Edit JSON files in `frontend/src/data/`
2. Commit & push
3. GitHub Actions auto-deploys

## 🐳 Docker Deployment

```bash
# Build image
docker build -t portfolio-website .

# Run container
docker run -d -p 80:80 portfolio-website

# Visit http://localhost
```

## 🔧 Technologies

- **Frontend**: React 19, Vite, Tailwind CSS
- **Icons**: React Icons, Lucide React
- **Routing**: React Router (removed - now static)
- **Deployment**: AWS S3 + CloudFront
- **CI/CD**: GitHub Actions
- **Container**: Docker + Nginx


## 🎨 Customization

### Change Colors
Edit `frontend/tailwind.config.js`

### Add/Remove Sections
Edit `frontend/src/components/Portfolio.jsx`

### Update Personal Info
Edit `frontend/src/components/QuickLinks.jsx`



## 🤝 Contributing

This is a personal portfolio, but feel free to fork and customize for your own use!




