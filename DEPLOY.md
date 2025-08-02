# 🚀 Netlify Deployment Guide

## Quick Deploy with Netlify CLI

### 1. Install Dependencies

```bash
# Install project dependencies
npm install

# Install Netlify CLI globally (if not already installed)
npm install -g netlify-cli
```

### 2. Login to Netlify

```bash
# This will open your browser to authenticate
netlify login
```

### 3. Initialize Netlify Site (First Time Only)

```bash
# Initialize a new Netlify site
netlify init

# Follow the prompts:
# 1. "Create & configure a new site" 
# 2. Choose your team (usually your personal account)
# 3. Site name: "cosmic-tab-coach" (or whatever you prefer)
# 4. Build command: npm run build
# 5. Directory to deploy: public
```

### 4. Deploy to Production

```bash
# Build and deploy in one command
npm run deploy

# Or manually:
npm run build
netlify deploy --prod --dir=public
```

## Alternative Deployment Methods

### Method 1: Git Integration (Recommended for ongoing development)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial Gatsby landing page"
   git remote add origin https://github.com/your-username/cosmic-tab-coach
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `public`
   - Click "Deploy site"

3. **Automatic Deployments:**
   - Every git push to main branch will trigger a new deployment
   - Perfect for ongoing development

### Method 2: Drag & Drop Deploy

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Manual upload:**
   - Go to [netlify.com/drop](https://netlify.com/drop)
   - Drag and drop the `public/` folder
   - Get instant live URL

## 🔧 Environment Setup

### Required Files (Already Created)
- ✅ `package.json` - Dependencies and scripts
- ✅ `gatsby-config.js` - Gatsby configuration
- ✅ `netlify.toml` - Netlify deployment settings
- ✅ `src/data/affirmations.json` - Content database

### Build Commands Available
```bash
npm run develop    # Local development server
npm run build      # Production build
npm run serve      # Test production build locally
npm run clean      # Clear Gatsby cache
npm run deploy     # Build and deploy to Netlify
```

## 🌍 Custom Domain (Optional)

### 1. Add Custom Domain in Netlify Dashboard
- Go to Site settings → Domain management
- Add custom domain (e.g., `cosmic-tab-coach.com`)

### 2. Configure DNS
Point your domain to Netlify:
- Add CNAME record: `www` → `your-site.netlify.app`
- Add A record: `@` → `75.2.60.5`

### 3. Enable HTTPS
- Netlify automatically provisions SSL certificates
- Force HTTPS redirect in Site settings

## 📊 Deployment Verification

After deployment, verify these pages work:

- ✅ **Landing Page**: `https://your-site.netlify.app/`
- ✅ **Cosmic Tab Demo**: `/cosmic-tab`
- ✅ **Affirmation System**: `/affirmation-demo`
- ✅ **Settings Panel**: `/settings` (to be created)
- ✅ **Upgrade Flow**: `/upgrade` (to be created)
- ✅ **Theme Gallery**: `/themes` (to be created)

## 🎯 Performance Optimization

### Already Configured:
- Static site generation for fast loading
- Image optimization with Gatsby
- Code splitting and minification
- Cache headers in `netlify.toml`
- Service worker for offline capability

### Lighthouse Scores Target:
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

## 🔍 Troubleshooting

### Common Issues:

**Build Fails:**
```bash
# Clear cache and rebuild
npm run clean
npm install
npm run build
```

**GraphQL Errors:**
- Check `src/data/affirmations.json` exists
- Verify JSON is valid (no syntax errors)
- Restart development server

**Missing Pages:**
- Ensure all page files are in `src/pages/`
- Check file naming (kebab-case recommended)
- Verify imports are correct

**Styling Issues:**
- Styled-components may need server-side rendering
- Check browser console for errors
- Verify CSS-in-JS is working

### Support Resources:
- [Gatsby Documentation](https://www.gatsbyjs.com/docs/)
- [Netlify Documentation](https://docs.netlify.com/)
- [GitHub Issues](https://github.com/your-repo/issues)

## 📱 Mobile Testing

Test on multiple devices:
- iPhone (Safari)
- Android (Chrome)
- Tablet (iPad/Android)
- Desktop (Chrome, Firefox, Safari)

## 🚀 Next Steps After Deployment

1. **Share the URL** with stakeholders for feedback
2. **Test all interactive features** thoroughly
3. **Monitor performance** with Netlify Analytics
4. **Set up form handling** if needed for contact/feedback
5. **Configure monitoring** for uptime and errors
6. **Plan content updates** and maintenance schedule

---

**Your site will be live at:** `https://your-chosen-name.netlify.app`

**Estimated deployment time:** 2-3 minutes for first deploy, 30-60 seconds for updates.

🎉 **You're ready to deploy!** Run `npm run deploy` and watch your Cosmic Tab Coach landing page come to life!