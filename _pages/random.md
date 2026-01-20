---
layout: single
title: "Random"
permalink: /random/
author_profile: true
---

<style>
  .tier-board { display: flex; flex-direction: column; gap: 18px; margin-top: 8px; }
  .tier-section {
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid rgba(0,0,0,0.08);
    box-shadow: 0 10px 25px rgba(0,0,0,0.06);
  }
  .tier-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding: 12px 14px;
    font-weight: 800;
    letter-spacing: 0.2px;
  }
  .tier-sub { font-weight: 600; opacity: 0.8; font-size: 0.95em; }
  .tier-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 12px;
    padding: 12px 14px 14px;
    background: rgba(0,0,0,0.02);
  }
  .course-card {
    grid-column: span 12;
    border-radius: 16px;
    padding: 12px 12px 10px;
    background: rgba(255,255,255,0.8);
    border: 1px solid rgba(0,0,0,0.08);
    transition: transform 120ms ease, box-shadow 120ms ease;
  }
  .course-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(0,0,0,0.12);
  }
  .course-top { display: flex; gap: 10px; align-items: baseline; flex-wrap: wrap; }
  .code-pill {
    font-weight: 800;
    font-size: 0.95em;
    padding: 3px 10px;
    border-radius: 999px;
    border: 1px solid rgba(0,0,0,0.12);
    background: rgba(0,0,0,0.03);
  }
  .course-title { font-weight: 800; font-size: 1.05em; }
  .course-notes { margin-top: 6px; opacity: 0.9; }
  .sparkle { opacity: 0.9; }

  /* Responsive */
  @media (min-width: 700px) {
    .course-card { grid-column: span 6; }
  }
  @media (min-width: 1020px) {
    .course-card { grid-column: span 4; }
  }

  /* Tier colors */
  .t-spp .tier-head { background: rgba(135, 90, 255, 0.14); }
  .t-sp  .tier-head { background: rgba(70, 140, 255, 0.14); }
  .t-s   .tier-head { background: rgba(70, 200, 150, 0.14); }
  .t-a   .tier-head { background: rgba(255, 185, 70, 0.18); }
  .t-b   .tier-head { background: rgba(255, 110, 110, 0.16); }
</style>

### Course Tier Board <span class="sparkle">☕️📚</span>

{% assign tiers = "S++,S+,S,A,B" | split: "," %}

<div class="tier-board">
  {% for t in tiers %}
    {% assign klass = "" %}
    {% if t == "S++" %}{% assign klass = "t-spp" %}{% endif %}
    {% if t == "S+"  %}{% assign klass = "t-sp"  %}{% endif %}
    {% if t == "S"   %}{% assign klass = "t-s"   %}{% endif %}
    {% if t == "A"   %}{% assign klass = "t-a"   %}{% endif %}
    {% if t == "B"   %}{% assign klass = "t-b"   %}{% endif %}

    {% assign count = 0 %}
    {% for c in site.data.random_courses %}
      {% if c.tier == t %}
        {% assign count = count | plus: 1 %}
      {% endif %}
    {% endfor %}

    {% if count > 0 %}
    <section class="tier-section {{ klass }}">
      <div class="tier-head">
        <div>Tier {{ t }}</div>
        <div class="tier-sub">{{ count }} class{% if count != 1 %}es{% endif %}</div>
      </div>

      <div class="tier-grid">
        {% for c in site.data.random_courses %}
          {% if c.tier == t %}
            <div class="course-card">
              <div class="course-top">
                <span class="code-pill">{{ c.code }}</span>
                <span class="course-title">{{ c.title }}</span>
              </div>
              {% if c.notes %}
                <div class="course-notes">{{ c.notes }}</div>
              {% endif %}
            </div>
          {% endif %}
        {% endfor %}
      </div>
    </section>
    {% endif %}
  {% endfor %}
</div>
