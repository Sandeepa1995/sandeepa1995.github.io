---
layout: page
title: Publications
permalink: /publications/
---

You can also find my publications on [Google Scholar](https://scholar.google.com/citations?user={{ site.google_scholar }}).

---

{% assign sorted_pubs = site.publications | sort: 'year' | reverse %}
{% for pub in sorted_pubs %}
  {% include publication.html pub=pub %}
{% endfor %}

---

<!-- ## Preprints & Under Review
Add your preprints here or create separate publication files with `status: preprint` in the front matter. -->
