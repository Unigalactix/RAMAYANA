<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/10An2-J1Dc6dhZ2XJvcAHz3QCmdy7DLMj

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

This repository includes a GitHub Actions workflow that builds the app and deploys the `dist` output to the `gh-pages` branch.

- Push to the `deploy` branch (or trigger the workflow manually from the Actions tab) to start deployment.
- The workflow sets `VITE_BASE` automatically to the repository path so the site will be served correctly from GitHub Pages.

If you want to change the branch that triggers deployment, edit `.github/workflows/gh-pages.yml`.
