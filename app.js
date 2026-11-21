/* ── Render ── */
const $ = id => document.getElementById(id);
const pad = n => String(n).padStart(2, "0");
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

$("year").textContent = new Date().getFullYear();
$("count").textContent = POEMAS.length ? (POEMAS.length === 1 ? "1 texto" : POEMAS.length + " textos") : "";

$("list").innerHTML = POEMAS.length
  ? POEMAS.map((p, i) => `<li><a class="row" href="#poema-${i + 1}">
      <span class="mono">${pad(i + 1)}</span>
      <span class="t">${esc(p.titulo)}</span>
      <span class="mono d">${p.fecha ? esc(p.fecha) : ""}</span></a></li>`).join("")
  : `<li class="empty">Aún no hay textos publicados.</li>`;

function route(){
  const m = location.hash.match(/^#poema-(\d+)$/);
  const i = m ? parseInt(m[1], 10) - 1 : -1;
  const p = POEMAS[i];
  $("home").hidden = !!p;
  $("reader").hidden = !p;
  if (!p){ document.title = "Invisible"; return; }

  const estrofas = String(p.texto).trim().split(/\n\s*\n/)
    .map(s => `<p>${esc(s.split("\n").map(l => l.trim()).join("\n"))}</p>`).join("");
  $("piece").innerHTML = `<span class="ghost" aria-hidden="true">${pad(i + 1)}</span>${p.fecha ? `<span class="mono meta">${esc(p.fecha)}</span>` : ""}
    <h1>${esc(p.titulo)}</h1>${estrofas}<hr class="rule">`;
  $("pos").textContent = pad(i + 1) + " / " + pad(POEMAS.length);

  const a = POEMAS[i - 1], b = POEMAS[i + 1];
  $("pager").innerHTML =
    (a ? `<a class="prev" href="#poema-${i}">Anterior<span class="pt">${esc(a.titulo)}</span></a>` : "") +
    (b ? `<a class="next" href="#poema-${i + 2}">Siguiente<span class="pt">${esc(b.titulo)}</span></a>` : "");
  document.title = p.titulo + " — Invisible";
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route);
route();
