---
layout: single
title: "Random"
permalink: /random/
author_profile: true
---

### Course Tier List

<style>
  .tier-table { width: 100%; border-collapse: collapse; }
  .tier-table th, .tier-table td { padding: 10px 12px; border-bottom: 1px solid rgba(0,0,0,0.08); vertical-align: top; }
  .tier-table th { text-align: left; font-weight: 700; }
  .badge { display: inline-block; padding: 2px 10px; border-radius: 999px; font-weight: 700; font-size: 0.9em; }
  .badge-spp { background: rgba(90, 60, 200, 0.12); }
  .badge-sp  { background: rgba(60, 120, 200, 0.12); }
  .badge-s   { background: rgba(60, 160, 120, 0.12); }
  .badge-a   { background: rgba(220, 160, 60, 0.14); }
  .badge-b   { background: rgba(220, 80, 80, 0.12); }
  .muted { opacity: 0.85; }
</style>

<table class="tier-table">
  <thead>
    <tr>
      <th style="width: 22%;">Code</th>
      <th style="width: 48%;">Title</th>
      <th style="width: 10%;">Tier</th>
      <th style="width: 20%;">Notes</th>
    </tr>
  </thead>
  <tbody>
    {% for c in site.data.random_courses %}
      {% assign badge_class = "badge" %}
      {% if c.tier == "S++" %}{% assign badge_class = badge_class | append: " badge-spp" %}{% endif %}
      {% if c.tier == "S+"  %}{% assign badge_class = badge_class | append: " badge-sp"  %}{% endif %}
      {% if c.tier == "S"   %}{% assign badge_class = badge_class | append: " badge-s"   %}{% endif %}
      {% if c.tier == "A"   %}{% assign badge_class = badge_class | append: " badge-a"   %}{% endif %}
      {% if c.tier == "B"   %}{% assign badge_class = badge_class | append: " badge-b"   %}{% endif %}

      <tr>
        <td><strong>{{ c.code }}</strong></td>
        <td>{{ c.title }}</td>
        <td><span class="{{ badge_class }}">{{ c.tier }}</span></td>
        <td class="muted">{{ c.notes }}</td>
      </tr>
    {% endfor %}
  </tbody>
</table>
