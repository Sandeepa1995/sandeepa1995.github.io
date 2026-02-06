---
layout: page
title: Projects
permalink: /projects/
---

TODO

---

<!-- {% assign sorted_projects = site.projects | sort: 'date' | reverse %}
{% for project in sorted_projects %}
<div class="project-card">
  <h3><a href="{{ project.url }}">{{ project.title }}</a></h3>
  <p class="project-meta">
    <span class="project-date">{{ project.date | date: "%Y" }}</span>
    {% if project.tags %}
    <span class="project-tags">
      {% for tag in project.tags %}
      <span class="tag">{{ tag }}</span>
      {% endfor %}
    </span>
    {% endif %}
  </p>
  <p>{{ project.description }}</p>
  {% if project.links %}
  <div class="project-links">
    {% for link in project.links %}
    <a href="{{ link.url }}" class="project-link">{{ link.name }}</a>
    {% endfor %}
  </div>
  {% endif %}
</div>
{% endfor %} -->
