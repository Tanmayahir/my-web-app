# 🚀 Deploy SkyWatch PRO to Google Cloud Platform

## 🌟 Quick Start Options

### Option 1: Google Cloud Run (Recommended - Free Tier)
### Option 2: Google App Engine (Easy - Free Tier)
### Option 3: Google Cloud Storage + Cloud CDN (Static Hosting)

---

## 🎯 Option 1: Google Cloud Run (Recommended)

### Step 1: Install Google Cloud CLI
```bash
# Download from: https://cloud.google.com/sdk/docs/install
# Or use Windows installer
```

### Step 2: Initialize Google Cloud
```bash
# Login to your Google account
gcloud auth login

# Set your project (create one if needed)
gcloud config set project YOUR_PROJECT_ID

# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
```

### Step 3: Create Dockerfile
Create a file named `Dockerfile` in your project:

```dockerfile
# Use nginx to serve static files
FROM nginx:alpine

# Copy your files to nginx directory
COPY . /usr/share/nginx/html/

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### Step 4: Create nginx.conf
Create a file named `nginx.conf`:

```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;
        
        location / {
            try_files $uri $uri/ /index.html;
        }
        
        # Enable gzip compression
        gzip on;
        gzip_types text/css application/javascript;
        
        # Cache static files
        location ~* \.(css|js|gif|png|jpg|jpeg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### Step 5: Deploy to Cloud Run
```bash
# Build and deploy
gcloud run deploy skywatch-pro \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 80

# Your app will be available at:
# https://skywatch-pro-xxxxx-uc.a.run.app
```

---

## 🎯 Option 2: Google App Engine (Easiest)

### Step 1: Create app.yaml
Create a file named `app.yaml`:

```yaml
runtime: python39
handlers:
  - url: /
    static_files: index.html
    upload: index.html
    
  - url: /(.*)
    static_files: \1
    upload: .*
    
  - url: /.*
    static_files: index.html
    upload: index.html

env_variables:
  GOOGLE_CLOUD_PROJECT: "your-project-id"
```

### Step 2: Deploy to App Engine
```bash
# Deploy
gcloud app deploy

# Open your app
gcloud app browse
```

---

## 🎯 Option 3: Google Cloud Storage (Static Hosting)

### Step 1: Create Storage Bucket
```bash
# Create bucket (must be globally unique)
gsutil mb gs://skywatch-pro-weather-app

# Make bucket public
gsutil iam ch allUsers:objectViewer gs://skywatch-pro-weather-app

# Enable website hosting
gsutil web set -m index.html gs://skywatch-pro-weather-app
```

### Step 2: Upload Files
```bash
# Upload all files
gsutil -m cp -r . gs://skywatch-pro-weather-app/

# Set public access
gsutil -m acl ch -u AllUsers:R gs://skywatch-pro-weather-app/*
```

### Step 3: Access Your App
Your app will be available at:
```
https://storage.googleapis.com/skywatch-pro-weather-app/index.html
```

---

## 🔧 Setup Instructions

### 1. Install Google Cloud CLI
```bash
# Windows (PowerShell)
# Download from: https://cloud.google.com/sdk/docs/install-windows

# Or use winget
winget install Google.CloudSDK
```

### 2. Initialize Project
```bash
# Login
gcloud auth login

# Create new project (or use existing)
gcloud projects create skywatch-pro-weather --name="SkyWatch PRO Weather"

# Set project
gcloud config set project skywatch-pro-weather

# Enable billing (required for some services)
# Go to: https://console.cloud.google.com/billing
```

### 3. Enable Required APIs
```bash
# For Cloud Run
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com

# For App Engine
gcloud services enable appengine.googleapis.com

# For Cloud Storage
gcloud services enable storage.googleapis.com
```

---

## 📁 Project Structure
```
skywatch-pro/
├── index.html
├── style.css
├── script.js
├── background.gif
├── weather.png
├── Dockerfile (for Cloud Run)
├── nginx.conf (for Cloud Run)
├── app.yaml (for App Engine)
└── README.md
```

---

## 🌐 Custom Domain Setup

### 1. Map Custom Domain
```bash
# For Cloud Run
gcloud run domain-mappings create \
  --service skywatch-pro \
  --domain your-domain.com \
  --region us-central1

# For App Engine
gcloud app domain-mappings create your-domain.com
```

### 2. Update DNS
Add CNAME record pointing to your service URL.

---

## 💰 Cost Estimation

### Free Tier (Monthly)
- **Cloud Run**: 2 million requests, 360,000 GB-seconds
- **App Engine**: 28 instance hours
- **Cloud Storage**: 5 GB storage, 1 GB download

### Your App Usage
- Static files: ~1-2 MB
- API calls: ~100-1000/month
- **Estimated cost: $0-5/month**

---

## 🚀 Quick Deploy Commands

### Cloud Run (Recommended)
```bash
# One command deployment
gcloud run deploy skywatch-pro --source . --platform managed --region us-central1 --allow-unauthenticated --port 80
```

### App Engine
```bash
# Deploy
gcloud app deploy

# Open
gcloud app browse
```

### Cloud Storage
```bash
# Create and deploy
gsutil mb gs://skywatch-pro-$(date +%s)
gsutil -m cp -r . gs://skywatch-pro-$(date +%s)/
gsutil iam ch allUsers:objectViewer gs://skywatch-pro-$(date +%s)
gsutil web set -m index.html gs://skywatch-pro-$(date +%s)
```

---

## 🔍 Troubleshooting

### Common Issues:
1. **CORS Errors**: Add CORS headers in nginx.conf
2. **404 Errors**: Check file paths and nginx configuration
3. **API Key Issues**: Ensure OpenWeatherMap API key is valid
4. **Billing**: Enable billing for your project

### Debug Commands:
```bash
# Check project status
gcloud config list

# View logs
gcloud logging read "resource.type=cloud_run_revision"

# Check billing
gcloud billing accounts list
```

---

## 🎉 Success!

Once deployed, your SkyWatch PRO weather app will be:
- ✅ Globally accessible
- ✅ Fast loading with CDN
- ✅ HTTPS secure
- ✅ Scalable
- ✅ Cost-effective

**Your app URL will be:**
- Cloud Run: `https://skywatch-pro-xxxxx-uc.a.run.app`
- App Engine: `https://skywatch-pro-weather.uc.r.appspot.com`
- Cloud Storage: `https://storage.googleapis.com/bucket-name/index.html`

---

## 📞 Need Help?

1. **Google Cloud Console**: https://console.cloud.google.com
2. **Documentation**: https://cloud.google.com/docs
3. **Support**: https://cloud.google.com/support

**Start with Cloud Run - it's the most modern and cost-effective option!** 