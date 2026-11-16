// ====== EDIT THIS LIST TO ADD GAMES / MODS ======
// url:   page people are sent to (official page recommended)
// embed: optional URL that allows iframe embedding; leave "" to hide the Play button
// Only embed things whose owner allows it.
const ENTRIES = [
  {
    name: "Friday Night Funkin' (Official)",
    desc: "The original game on Newgrounds, by the Funkin' Crew.",
    tags: ["Original", "Game"],
    url: "https://www.newgrounds.com/portal/view/770371",
    embed: "",
    color: "#ff4fd8"
  },
  {
    name: "FNF Source Code",
    desc: "The official open-source engine on GitHub.",
    tags: ["Tool"],
    url: "https://github.com/FunkinCrew/Funkin",
    embed: "",
    color: "#4fd8ff"
  },
  {
    name: "GameBanana FNF Mods",
    desc: "Huge catalog of community mods, skins and tools.",
    tags: ["Mods"],
    url: "https://gamebanana.com/games/8694",
    embed: "",
    color: "#6dff8a"
  }
  // { name:"My Mod", desc:"...", tags:["Mods"], url:"https://...", embed:"", color:"#ffaa33" },
];
// ================================================

const grid = document.getElementById("grid");
const empty = document.getElementById("empty");
const search = document.getElementById("search");
const filters = document.getElementById("filters");
const modal = document.getElementById("modal");
const frame = document.getElementById("frame");

let activeTag = "All";
const tags = ["All", ...new Set(ENTRIES.flatMap(e => e.tags))];

tags.forEach(t => {
  const b = document.createElement("button");
  b.textContent = t;
  if (t === activeTag) b.className = "on";
  b.onclick = () => {
    activeTag = t;
    [...filters.children].forEach(c => c.classList.toggle("on", c.textContent === t));
    render();
  };
  filters.appendChild(b);
});

function el(tag, props = {}, ...kids) {
  const n = document.createElement(tag);
  Object.assign(n, props);
  kids.forEach(k => n.append(k));
  return n;
}

function render() {
  const q = search.value.trim().toLowerCase();
  grid.replaceChildren();
  const list = ENTRIES.filter(e =>
    (activeTag === "All" || e.tags.includes(activeTag)) &&
    (e.name + " " + e.desc).toLowerCase().includes(q));
  empty.hidden = list.length > 0;
  list.forEach(e => {
    const thumb = el("div", { className: "thumb", textContent: e.name[0] });
    thumb.style.background = `linear-gradient(135deg, ${e.color}, #1e1230)`;
    const actions = el("div", { className: "actions" },
      el("a", { className: "btn", href: e.url, target: "_blank", rel: "noopener noreferrer", textContent: "Open" }));
    if (e.embed) {
      const play = el("button", { className: "btn alt", textContent: "Play here" });
      play.onclick = () => { frame.src = e.embed; modal.hidden = false; };
      actions.append(play);
    }
    grid.append(el("article", { className: "card" }, thumb,
      el("div", { className: "body" },
        el("h3", { textContent: e.name }),
        el("span", { className: "tag", textContent: e.tags.join(" · ") }),
        el("p", { textContent: e.desc }),
        actions)));
  });
}

function closeModal() { modal.hidden = true; frame.src = "about:blank"; }
document.getElementById("close").onclick = closeModal;
modal.onclick = ev => { if (ev.target === modal) closeModal(); };
document.addEventListener("keydown", ev => { if (ev.key === "Escape") closeModal(); });
search.addEventListener("input", render);
render();
