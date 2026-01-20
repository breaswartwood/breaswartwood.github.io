(function () {
  const dataEl = document.getElementById("tierlist-data");
  const gridEl = document.getElementById("tierlist-grid");
  const searchEl = document.getElementById("tierlist-search");
  const sortEl = document.getElementById("tierlist-sort");
  const tierBtns = Array.from(document.querySelectorAll(".tier-btn"));
  if (!dataEl || !gridEl) return;

  const tierOrder = { S: 0, A: 1, B: 2, C: 3 };
  let all = [];
  try { all = JSON.parse(dataEl.textContent || "[]"); } catch (e) { all = []; }

  let state = { tier: "ALL", q: "", sort: "tier" };

  function normalize(s) { return (s || "").toLowerCase().trim(); }

  function compare(a, b) {
    if (state.sort === "tier") {
      const ta = tierOrder[a.tier] ?? 99;
      const tb = tierOrder[b.tier] ?? 99;
      if (ta !== tb) return ta - tb;
      return normalize(a.code).localeCompare(normalize(b.code));
    }
    if (state.sort === "code") return normalize(a.code).localeCompare(normalize(b.code));
    return normalize(a.title).localeCompare(normalize(b.title));
  }

  function escapeHtml(s) {
    return (s ?? "").toString().replace(/[&<>"']/g, (m) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[m]));
  }

  function filtered() {
    const q = normalize(state.q);
    return all
      .filter((x) => (state.tier === "ALL" ? true : x.tier === state.tier))
      .filter((x) => {
        if (!q) return true;
        return (
          normalize(x.code).includes(q) ||
          normalize(x.title).includes(q) ||
          normalize(x.notes).includes(q) ||
          normalize(x.tier).includes(q) ||
          normalize(x.display_tier).includes(q)
        );
      })
      .slice()
      .sort(compare);
  }

  function card(x) {
    const badge = x.display_tier || x.tier;
    const notes = x.notes ? `<div class="tierlist-notes">${escapeHtml(x.notes)}</div>` : "";
    return `
      <button class="tiercard" type="button" data-tier="${escapeHtml(x.tier)}">
        <div class="tierbadge">${escapeHtml(badge)}</div>
        <div class="tiercard-main">
          <div class="tiercard-code">${escapeHtml(x.code || "")}</div>
          <div class="tiercard-title">${escapeHtml(x.title || "")}</div>
          ${notes}
        </div>
      </button>
    `;
  }

  function render() {
    const items = filtered();
    gridEl.innerHTML = items.length ? items.map(card).join("") : `<div class="tierlist-empty">No matches.</div>`;
  }

  tierBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tierBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      state.tier = btn.dataset.tier || "ALL";
      render();
    });
  });

  searchEl?.addEventListener("input", (e) => { state.q = e.target.value || ""; render(); });
  sortEl?.addEventListener("change", (e) => { state.sort = e.target.value || "tier"; render(); });

  render();
})();
