# Personal Academic Website - Jekyll Edition

A clean, minimalist personal website for PhD students built with Jekyll. Designed for easy content updates using Markdown files.

## 🎯 Why Jekyll?

- **Easy Updates**: Add publications and projects by creating simple Markdown files
- **No HTML Editing**: Write content in Markdown, Jekyll handles the HTML
- **GitHub Pages Native**: GitHub Pages has built-in Jekyll support
- **Version Control**: Track all changes with Git
- **Blog-Ready**: Can easily add a blog later if needed

## 📁 Project Structure

```
.
├── _config.yml              # Site configuration
├── _layouts/                # Page templates
│   ├── default.html
│   ├── home.html
│   ├── page.html
│   ├── publication.html
│   └── project.html
├── _includes/               # Reusable components
│   └── publication.html
├── _publications/           # Publication files (add new ones here!)
│   ├── 2024-cvpr-paper.md
│   └── 2023-icml-paper.md
├── _projects/               # Project files (add new ones here!)
│   ├── cv-framework.md
│   └── nlp-toolkit.md
├── assets/
│   └── css/
│       └── style.css        # Minimalist styles
├── index.md                 # Home page
├── publications.md          # Publications listing page
├── projects.md              # Projects listing page
├── Gemfile                  # Ruby dependencies
└── README.md                # This file
```

## 🚀 Quick Start

### Option 1: Local Development (Recommended for testing)

1. **Install Ruby and Jekyll**:
   ```bash
   # On macOS (using Homebrew)
   brew install ruby
   gem install bundler jekyll
   
   # On Ubuntu/Debian
   sudo apt-get install ruby-full build-essential
   gem install bundler jekyll
   
   # On Windows
   # Download and install from https://rubyinstaller.org/
   ```

2. **Clone/download this repository**

3. **Install dependencies**:
   ```bash
   cd your-website-folder
   bundle install
   ```

4. **Run locally**:
   ```bash
   bundle exec jekyll serve
   ```
   
   Visit `http://localhost:4000` to see your site!

5. **Make changes and see them live**: Jekyll will automatically rebuild when you edit files

### Option 2: Direct GitHub Pages Deployment

1. **Create a GitHub repository** named `yourusername.github.io`

2. **Upload all files** to the repository

3. **GitHub Pages will automatically build your site**!
   - Visit `https://yourusername.github.io` after a few minutes

## ✏️ How to Update Content

### Update Your Information (_config.yml)

Edit `_config.yml` to update your basic info:

```yaml
title: Your Name
email: your.email@university.edu
description: >-
  PhD Student in Computer Science at University Name.

author: Your Name
university: University Name
position: PhD Student
advisor: Professor Name

github_username: yourusername
linkedin_username: yourprofile
google_scholar: your-scholar-id
```

### Update Home Page (index.md)

Simply edit `index.md` in Markdown:

```markdown
## Hello, I'm **Your Name**

I'm a PhD student in Computer Science at [University Name](https://university.edu)...

### Research Interests
- Machine Learning
- Computer Vision
```

### Add a Publication

Create a new file in `_publications/` folder (e.g., `_publications/2024-neurips-paper.md`):

```markdown
---
title: "Your Amazing Paper Title"
authors: "<strong>Your Name</strong>, Co-Author One, Co-Author Two"
venue: "Conference Name (ABBREVIATED)"
year: 2024
description: "Brief description of what the paper is about."
links:
  - name: PDF
    url: /assets/papers/paper.pdf
  - name: Code
    url: https://github.com/yourusername/repo
  - name: arXiv
    url: https://arxiv.org/abs/xxxx.xxxxx
---

## Abstract

Your full abstract here (optional).

## Citation

\```bibtex
@inproceedings{yourname2024paper,
  title={Your Amazing Paper Title},
  author={Your Name and Others},
  booktitle={Conference Name},
  year={2024}
}
\```
```

**That's it!** The publication will automatically appear on your publications page, sorted by year.

### Add a Project

Create a new file in `_projects/` folder (e.g., `_projects/my-awesome-project.md`):

```markdown
---
title: "My Awesome Project"
date: 2024-01-15
description: "A brief description of what this project does."
tags:
  - Machine Learning
  - Python
  - Computer Vision
links:
  - name: GitHub
    url: https://github.com/yourusername/project
  - name: Demo
    url: https://demo-url.com
---

## Overview

Detailed description of your project...

## Features

- Feature 1
- Feature 2

## Usage

\```python
import awesome_project
awesome_project.do_something()
\```
```

### Adding Files (PDFs, Images, etc.)

1. Create folders in `assets/`:
   ```
   assets/
   ├── papers/
   ├── images/
   └── projects/
   ```

2. Upload your files there

3. Reference them in your Markdown:
   ```markdown
   ![My Image](/assets/images/my-image.png)
   [Download PDF](/assets/papers/my-paper.pdf)
   ```

## 🎨 Customizing the Design

### Change Colors

Edit `assets/css/style.css` and modify the CSS variables:

```css
:root {
  --text-color: #1a1a1a;      /* Main text color */
  --accent-color: #0066cc;    /* Links and accents */
  --bg-color: #ffffff;        /* Background */
  --border-color: #e0e0e0;    /* Borders */
}
```

### Adjust Layout Width

In `style.css`, change:
```css
:root {
  --max-width: 720px;  /* Change to 800px, 900px, etc. */
}
```

## 🌐 GitHub Pages + Custom Domain

### Enable GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** or **master**, folder: **/ (root)**
4. Save

Your site will be live at `https://yourusername.github.io`

### Add Custom Domain

1. **Buy a domain** (Namecheap, Google Domains, etc.)

2. **Configure DNS** at your registrar:
   
   **Option A: Apex domain (yourname.com)**
   Add these A records:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
   
   **Option B: Subdomain (www.yourname.com)**
   Add a CNAME record:
   ```
   www → yourusername.github.io
   ```

3. **Configure GitHub**:
   - Settings → Pages → Custom domain
   - Enter your domain
   - Check **Enforce HTTPS** (after DNS propagates)

4. **Add CNAME file** to your repository:
   Create a file named `CNAME` (no extension) containing:
   ```
   yourname.com
   ```

5. **Wait for DNS** (can take up to 48 hours, usually faster)

## 🔄 Publishing Updates

### Using Git (Command Line)

```bash
# Make your changes to files
git add .
git commit -m "Add new publication"
git push
```

Changes go live in 1-2 minutes!

### Using GitHub Web Interface

1. Navigate to the file on GitHub
2. Click the pencil icon (Edit)
3. Make changes
4. Commit directly to main branch

## 📋 Content Management Workflow

### Adding a New Publication

1. Create `_publications/YYYY-conference-shortname.md`
2. Fill in the YAML front matter
3. Write abstract and citation (optional)
4. Commit and push
5. ✅ Done! It appears automatically

### Adding a New Project

1. Create `_projects/project-name.md`
2. Fill in front matter with title, date, tags, links
3. Write project description in Markdown
4. Commit and push
5. ✅ Done!

### Updating News/Bio

1. Edit `index.md`
2. Update the news section or your bio
3. Commit and push
4. ✅ Done!

## 🔧 Advanced Customization

### Add a Blog

1. Create `_posts/` folder
2. Add posts: `_posts/2024-01-15-my-first-post.md`
3. Create `blog.md` page
4. Jekyll automatically creates blog functionality

### Add Google Analytics

Add to `_layouts/default.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Change Fonts

Add Google Fonts to `_layouts/default.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
```

Then in `style.css`:
```css
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

## 🆘 Troubleshooting

**Site not building?**
- Check GitHub Actions tab for build errors
- Verify all YAML front matter is valid
- Make sure file names don't have spaces

**Publications not showing up?**
- Check file is in `_publications/` folder
- Verify YAML front matter has `title`, `authors`, `venue`, `year`
- Make sure there's a blank line after the closing `---`

**Styles not applying?**
- Clear browser cache
- Check `style.css` path in `default.html`
- Verify file is in `assets/css/style.css`

**Local server not working?**
```bash
# Try:
bundle update
bundle exec jekyll serve --trace
```

## 📚 Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Guide](https://docs.github.com/en/pages)
- [Markdown Cheat Sheet](https://www.markdownguide.org/cheat-sheet/)
- [YAML Tutorial](https://yaml.org/start.html)

## 💡 Tips

- **Preview locally** before pushing to GitHub
- **Use descriptive filenames** for publications and projects
- **Keep Markdown simple** - Jekyll handles the formatting
- **Commit often** - small, frequent updates are easier to track
- **Test all links** after adding new content

---

**Need help?** Check Jekyll documentation or GitHub Pages community forums!

Good luck with your website! 🎓
