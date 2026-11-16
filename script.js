// ====== EDIT THIS LIST TO ADD GAMES / MODS ======
// slug:     unique id used in the page address (#/mod/<slug>)
// url:      official page for the mod (recommended)
// embed:    optional URL that allows iframe embedding; "" shows an "Open official page" button instead
//           (only embed things whose owner allows it)
// image:    optional thumbnail image path/URL; "" uses a colored tile
// controls: shown on the mod page
const ENTRIES = [
  {
    slug: "friday-night-funkin",
    name: "Friday Night Funkin' (Official)",
    author: "Funkin' Crew",
    desc: "The original game on Newgrounds.",
    long: "Face off against Girlfriend's dad in rhythm battles and work your way through the weeks. This is the original game by ninjamuffin99, PhantomArcade, evilsk8r and Kawai Sprite.",
    tags: ["Original", "Game"],
    controls: "Arrow keys or D F J K",
    url: "https://www.newgrounds.com/portal/view/770371",
    embed: "",
    image: "",
    color: "#ff4fd8"
  },
  {
    slug: "fnf-source-code",
    name: "FNF Source Code",
    author: "Funkin' Crew",
    desc: "The official open-source engine on GitHub.",
    long: "The open-source code behind the game, useful if you want to build your own mods or engine.",
    tags: ["Tool"],
    controls: "Not a game",
    url: "https://github.com/FunkinCrew/Funkin",
    embed: "",
    image: "",
    color: "#4fd8ff"
  },
  {
    slug: "gamebanana-fnf-mods",
    name: "GameBanana FNF Mods",
    author: "Community",
    desc: "Huge catalog of community mods, skins and tools.",
    long: "Browse thousands of community-made mods, characters, songs and tools.",
    tags: ["Mods"],
    controls: "Depends on the mod",
    url: "https://gamebanana.com/games/8694",
    embed: "",
    image: "",
    color: "#6dff8a"
  }
  // {
  //   slug: "my-mod", name: "My Mod", author: "Me", desc: "Short blurb.",
  //   long: "Longer description for the mod page.", tags: ["Mods"],
  //   controls: "Arrow keys", url: "https://...", embed: "", image: "", color: "#ffaa33"
  // },
];
// ================================================

const app = document.getElementById("app");
const BASE_TITLE = document.title;
let query = "";
let activeTag = "All";

function el(tag, props = {}, ...kids) {
  const n = document.createElement(tag);
  Object.assign(n, props);
  kids.forEach(k => n.append(k));
  return n;
}

function tileStyle(node, e) {
  node.style.background = e.image
    ? `url("${e.image}") center/cover`
    : `linear-gradient(135deg, ${e.color}, #1e1230)`;
}

function card(e) {
  const thumb = el("div", { className: "thumb", textContent: e.image ? "" : e.name[0] });
  tileStyle(thumb, e);
  return el("a", { className: "card", href: "#/mod/" + e.slug }, thumb,
    el("div", { className: "body" },
      el("h3", { textContent: e.name }),
      el("span", { className: "tag", textContent: e.tags.join(" · ") })));
}

function showHome() {
  document.title = BASE_TITLE;
  app.replaceChildren();

  const tags = ["All", ...new Set(ENTRIES.flatMap(e => e.tags))];
  const grid = el("div", { className: "grid" });
  const empty = el("p", { className: "empty", textContent: "Nothing found.", hidden: true });
  const filters = el("div", { className: "filters" });
  const search = el("input", { id: "search", type: "search", placeholder: "Search mods...", value: query });
  search.setAttribute("aria-label", "Search mods");

  function render() {
    const q = query.trim().toLowerCase();
    grid.replaceChildren();
    const list = ENTRIES.filter(e =>
      (activeTag === "All" || e.tags.includes(activeTag)) &&
      (e.name + " " + e.desc + " " + e.author).toLowerCase().includes(q));
    empty.hidden = list.length > 0;
    list.forEach(e => grid.append(card(e)));
  }

  tags.forEach(t => {
    const b = el("button", { textContent: t, className: t === activeTag ? "on" : "" });
    b.onclick = () => {
      activeTag = t;
      [...filters.children].forEach(c => c.classList.toggle("on", c.textContent === t));
      render();
    };
    filters.append(b);
  });
  search.addEventListener("input", () => { query = search.value; render(); });

  app.append(
    el("section", { className: "hero" },
      el("h1", { textContent: "Friday Night Funkin' Hub" }),
      el("p", { textContent: "Click a mod to see its page." })),
    el("main", { className: "wrap" },
      el("div", { className: "controls" }, search, filters), grid, empty));
  render();
}

function showMod(slug) {
  const e = ENTRIES.find(x => x.slug === slug);
  if (!e) {
    document.title = "Not found – " + BASE_TITLE;
    app.replaceChildren(el("main", { className: "wrap" },
      el("h1", { textContent: "Mod not found" }),
      el("a", { href: "#/", textContent: "Back to all mods" })));
    return;
  }
  document.title = e.name + " – FNF Hub";

  const player = el("div", { className: "player" });
  const bg = el("div", { className: "thumb-bg" });
  tileStyle(bg, e);
  player.append(bg);
  if (e.embed) {
    const play = el("button", { className: "btn playbtn", textContent: "Play" });
    play.onclick = () => {
      player.replaceChildren(el("iframe", {
        src: e.embed, title: e.name, allow: "autoplay; fullscreen; gamepad"
      }));
      player.firstChild.setAttribute("allowfullscreen", "");
    };
    player.append(el("h2", { textContent: e.name }), play);
  } else {
    player.append(
      el("h2", { textContent: e.name }),
      el("p", { textContent: "Play this one on its official page." }),
      el("a", { className: "btn playbtn", href: e.url, target: "_blank", rel: "noopener noreferrer", textContent: "Open official page" }));
  }

  const chips = el("div", { className: "chips" }, ...e.tags.map(t => el("span", { textContent: t })));
  const side = el("aside", { className: "side" },
    el("dl", {},
      el("dt", { textContent: "Author" }), el("dd", { textContent: e.author }),
      el("dt", { textContent: "Controls" }), el("dd", { textContent: e.controls }),
      el("dt", { textContent: "Tags" }), el("dd", {}, chips)),
    el("a", { className: "btn alt", href: e.url, target: "_blank", rel: "noopener noreferrer", textContent: "Official page" }));

  const related = ENTRIES.filter(x => x.slug !== e.slug)
    .sort((a, b) => b.tags.filter(t => e.tags.includes(t)).length - a.tags.filter(t => e.tags.includes(t)).length)
    .slice(0, 4);

  app.replaceChildren(el("main", { className: "wrap mod" },
    el("div", { className: "crumbs" }, el("a", { href: "#/", textContent: "All mods" }), " / " + e.name),
    el("h1", { textContent: e.name }),
    el("div", { className: "mod-layout" }, player, side),
    el("section", { className: "section" },
      el("h2", { textContent: "About this mod" }),
      el("p", { textContent: e.long || e.desc })),
    related.length ? el("section", { className: "section" },
      el("h2", { textContent: "More mods" }),
      el("div", { className: "grid" }, ...related.map(card))) : ""));
}

function route() {
  const h = location.hash.replace(/^#\/?/, "");
  if (h.startsWith("mod/")) showMod(decodeURIComponent(h.slice(4)));
  else showHome();
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route);
route();
