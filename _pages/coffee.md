---
layout: single
title: "Palo Alto Coffee Map"
permalink: /coffee/
author_profile: true
---

A map of coffee shops around Palo Alto with my ratings and notes.

<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
/>

<div id="coffee-map" style="height: 520px; border-radius: 18px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.12);"></div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
  const shops = {{ site.data.coffee_shops | jsonify }};

  const map = L.map('coffee-map', {
    scrollWheelZoom: false
  }).setView([37.4419, -122.1430], 13);

  // OpenStreetMap tiles (free, widely used)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  function stars(rating) {
    const full = Math.floor(rating);
    const half = (rating - full >= 0.5) ? 1 : 0;
    const empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
  }

  const bounds = [];

  shops.forEach(s => {
    const marker = L.circleMarker([s.lat, s.lon], {
      radius: 8,
      weight: 2,
      fillOpacity: 0.9
    }).addTo(map);

    const link = s.url ? `<div style="margin-top:6px;"><a href="${s.url}" target="_blank" rel="noopener">Link</a></div>` : '';
    marker.bindPopup(`
      <div style="font-size:14px; line-height:1.25;">
        <div style="font-weight:700; margin-bottom:4px;">${s.name}</div>
        <div><span style="font-weight:600;">Rating:</span> ${s.rating} (${stars(s.rating)})</div>
        <div style="margin-top:6px;">${s.notes || ''}</div>
        ${link}
      </div>
    `);

    bounds.push([s.lat, s.lon]);
  });

  if (bounds.length) map.fitBounds(bounds, { padding: [30, 30] });
</script>
