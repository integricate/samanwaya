# 🚀 GitHub Pages Deployment Guide

## Setup Instructions

### 1. Configure Repository Settings

1. Go to your repository **Settings** on GitHub
2. Navigate to **Pages** in the left sidebar
3. Under **Build and deployment**:
   - **Source**: Select `GitHub Actions`
4. Click **Save**

### 2. Push Your Code

Push your code to the `main` branch:

```bash
git add .
git commit -m "Setup for GitHub Pages deployment"
git push origin main
```

The GitHub Actions workflow will automatically:
- Build your Vite project
- Deploy to GitHub Pages

### 3. Manual Deployment (Optional)

You can also trigger a manual deployment:

1. Go to **Actions** tab in your repository
2. Select **"Deploy to GitHub Pages"** workflow
3. Click **Run workflow**
4. Select the branch and click **Run workflow**

## Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions deployment workflow
├── dist/                   # Built files (generated after build)
├── src/                    # Source files
├── index.html              # Entry HTML file
├── package.json            # Dependencies and scripts
└── vite.config.ts          # Vite configuration (with base: './' for GH Pages)
```

## How It Works

1. **On every push to `main`**: The workflow automatically builds and deploys
2. **Build process**: Runs `npm run build` which outputs to `./dist`
3. **Deployment**: Uploads the `dist` folder to GitHub Pages
4. **Base path**: Configured as `./` in `vite.config.ts` for relative paths

## Accessing Your Site

After deployment, your site will be available at:
```
https://<username>.github.io/<repository-name>/
```

## Troubleshooting

- Check the **Actions** tab for build logs
- Ensure all dependencies are listed in `package.json`
- Verify `base: './'` is set in `vite.config.ts`
- Make sure the Pages source is set to "GitHub Actions" in repository settings
