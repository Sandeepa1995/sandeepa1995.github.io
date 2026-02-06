# Quick Start Guide for Beginners

This is a simplified guide if you've never used Jekyll or GitHub Pages before.

## What You Need to Update (Minimum)

### 1. Edit `_config.yml`
Replace these placeholders:
- `Your Name` → Your actual name
- `your.email@university.edu` → Your email
- `University Name` → Your university
- `yourusername` → Your GitHub username
- `your-scholar-id` → Your Google Scholar ID

### 2. Edit `index.md`
Replace the example text with your information:
- Your name
- Your university and lab
- Your research interests
- Your recent news

### 3. Add Your Publications

For each publication:
1. Copy `_publications/2024-cvpr-paper.md`
2. Rename it (e.g., `2024-neurips-mywork.md`)
3. Edit the content with your paper details
4. Delete the example files once you have your own

### 4. Add Your Projects

For each project:
1. Copy `_projects/cv-framework.md`
2. Rename it (e.g., `my-awesome-project.md`)
3. Edit the content with your project details
4. Delete the example files once you have your own

## Deployment: GitHub Pages (Easiest Method)

1. **Create a GitHub account** if you don't have one

2. **Create a new repository**:
   - Name: `yourusername.github.io` (use your actual GitHub username)
   - Make it Public
   - Don't initialize with README

3. **Upload all files**:
   - Click "uploading an existing file"
   - Drag all your files and folders
   - Click "Commit changes"

4. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: Deploy from branch
   - Branch: main, folder: / (root)
   - Save

5. **Wait 2-5 minutes** and visit `https://yourusername.github.io`

## That's It!

Your website is now live. To update:
- Edit files directly on GitHub by clicking the pencil icon
- Changes appear in 1-2 minutes

## Optional: Use a Custom Domain

1. Buy a domain (e.g., from Namecheap, ~$10/year)
2. In domain settings, add these DNS records:
   ```
   Type: A, Host: @, Value: 185.199.108.153
   Type: A, Host: @, Value: 185.199.109.153
   Type: A, Host: @, Value: 185.199.110.153
   Type: A, Host: @, Value: 185.199.111.153
   ```
3. On GitHub: Settings → Pages → Custom domain → Enter your domain
4. Wait 24-48 hours for DNS to update

## Need Help?

- Check the full README.md for detailed instructions
- Google "Jekyll GitHub Pages tutorial" for video guides
- Ask in the GitHub community forums
