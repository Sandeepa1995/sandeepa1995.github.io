{% assign current_year = 'now' | date: "%Y" | plus: 0 %}
{% assign current_month = 'now' | date: "%-m" | plus: 0 %}
{% assign phd_year = current_year | minus: 2021 %}
{% if current_month < 8 %}
  {% assign phd_year = phd_year %}
{% else %}
  {% assign phd_year = phd_year | plus: 1 %}
{% endif %}

<div style="display: flex; gap: 2rem; align-items: center; margin-bottom: 2rem;">
  <div style="flex: 1;">
    <img src="/assets/images/profile.JPG" alt="Damitha Lenadora" style="width: 200px; border-radius: 5%; margin: 2rem 0;">
  </div>
  <div style="flex: 2;">
    <p>PhD. Student at UIUC ({{ phd_year }}th year)</p>
    <p>Compilers/Optimizations for ML and vice-versa.</p>
    <p>Email: damitha2 (at) illinois.edu</p>
    [CV (PDF)](/assets/cv.pdf)
  </div>
</div>

<!-- <img src="/assets/images/profile.JPG" alt="Damitha Lenadora" style="width: 200px; border-radius: 5%; margin: 2rem 0;"> -->

### About Me

I'm a PhD student in [Computer Science at University of Illinois at Urbana-Champaign](https://siebelschool.illinois.edu/), working in the intersection of machine learning and optimizations/compilers. My thesis is focused on [GALA](https://dl.acm.org/doi/10.1145/3763113): a GNN Domain Specific Language (DSL) and Compiler that can combine and explore optimizations at multiple granularities.

I'm advised by [Prof. Charith Mendis](https://charithmendis.com/) and am part of the [ADAPT](https://adapt.cs.illinois.edu/) group. I got my BSc. degree in [Computer Science and Engineering from the University of Moratuwa, Sri Lanka](https://cse.mrt.ac.lk/). 

### Research Interests

- Optimizations
- Compilers 
- Machine Learning
- Sparse Tensor Operations

### Education

**PhD in Computer Science** (Expected graduation date: January 2027)  
University of Illinois at Urbana-Champaign

**Bachelor of Science in Computer Science and Engineering** (2020)  
University of Moratuwa

### News

- **Feb 2026** - Presented our work on [GRANII](https://charithmendis.com/assets/pdf/26-cgo-granii.pdf) at CGO'26!
- **May 2024** - I'll be interning this summer at Samsung Semiconductor as a Compiler Research Intern!
- **Oct 2025** - Presented our work on [GALA](https://dl.acm.org/doi/10.1145/3763113) at OOPSLA'25!
- **Aug 2021** - Started a PhD at UIUC!

### Contact

Feel free to reach out via email at [{{ site.email }}](mailto:{{ site.email }}).

You can also find me on:
- [Google Scholar](https://scholar.google.com/citations?user={{ site.google_scholar }})
- [GitHub](https://github.com/{{ site.github_username }})
- [LinkedIn](https://linkedin.com/in/{{ site.linkedin_username }})
