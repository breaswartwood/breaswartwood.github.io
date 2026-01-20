---
layout: archive
title: "Random"
permalink: /random/
author_profile: true
---

<section class="tierlist">
  <h2>Caltech Class Tier List</h2>

  <p>
    Personal ranking based on vibes, usefulness, and entertainment. Please take this with a grain of salt!
  </p>

  <div class="tierlist-controls">
    <div class="tier-buttons" role="group" aria-label="Filter by tier">
      <button class="tier-btn is-active" data-tier="ALL">All</button>
      <button class="tier-btn" data-tier="S">S</button>
      <button class="tier-btn" data-tier="A">A</button>
      <button class="tier-btn" data-tier="B">B</button>
      <button class="tier-btn" data-tier="C">C</button>
    </div>

    <input id="tierlist-search" class="tierlist-search" type="search" placeholder="Search classes…" aria-label="Search classes" />

    <select id="tierlist-sort" class="tierlist-sort" aria-label="Sort classes">
      <option value="tier">Sort: Tier (S→C)</option>
      <option value="code">Sort: Course code</option>
      <option value="title">Sort: Title</option>
    </select>
  </div>

  <script id="tierlist-data" type="application/json">
    {{ site.data.caltech_course_tiers | jsonify }}
  </script>

  <div id="tierlist-grid" class="tierlist-grid" aria-live="polite"></div>
</section>

<script src="{{ site.baseurl }}/assets/js/tierlist.js"></script>
<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/tierlist.css">
