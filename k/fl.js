window.FLP = [
  { t: 'Tracquill - PCB Photo to KiCad (AI)', imgs: ['p1_1', 'p1_2', 'p1_3', 'p1_4'],
    d: `A desktop app I built for reverse engineering printed circuit boards. You give it photos, flatbed scans or X-rays of a board and it:
- straightens the images and aligns the board layers,
- detects tracks, pads, vias and components with AI (YOLO, ONNX Runtime),
- rebuilds the netlist (electrical connections),
- offers manual CAD tools: continuity probe, net highlighting and an IC pinout helper,
- exports a complete KiCad project plus Gerber, Excellon drill files and a BOM.

Runs on Windows and Linux with a one-click installer.
Tech: C++20, Qt 6/QML, OpenCV, ONNX Runtime.`, tags: ['C++', 'PCB Layout', 'Computer Vision'] },
  { t: 'Bilingual E-commerce Store (Next.js)', imgs: ['p2_1', 'p2_2'],
    d: `A complete online store for fishing gear in Egypt, designed and built from scratch:
- Arabic and English interface with full right-to-left support,
- responsive design for mobile and desktop with interactive animations,
- product catalogue with categories and search, cart and checkout,
- customer accounts and an admin panel for products, orders and images,
- PostgreSQL database and instant Telegram alerts for new orders.

Tech: Next.js, React, TypeScript, PostgreSQL.`, tags: ['Next.js', 'React.js', 'eCommerce'] },
  { t: 'Fast Landing Site for a CAD Product', imgs: ['p3_1', 'p3_2', 'p3_3'],
    d: `Marketing and sales website for Tracquill, my PCB reverse-engineering software:
- modern dark design with a clear visual identity,
- pages for home, features, pricing, download, FAQ, support and legal,
- very fast: plain HTML, CSS and JavaScript, no framework,
- mobile responsive, scroll reveal effects and WebP images,
- full SEO setup (sitemap, Open Graph).`, tags: ['HTML', 'CSS', 'Landing Pages'] },
  { t: 'Tidebid: Real-time Multiplayer Game', imgs: ['p4_1', 'p4_2'],
    d: `A fast 2-4 player strategy bidding game where humans and AI agents play in the same match:
- play against bots instantly, or create a match with a code and share it,
- round timer, match log, replay and spectator mode,
- full JSON API so any program or AI agent can play,
- deployed on Cloudflare Workers, with automated tests and a 4000-match simulation used to balance the game.

Live: tidebid.mo-harraz3.workers.dev`, tags: ['JavaScript', 'Node.js', 'API'] },
  { t: 'Telegram Bot: Gold Price Alerts', imgs: ['p5_1'],
    d: `A Telegram bot running in the cloud:
- scrapes gold and silver prices every 5 minutes and stores them in a database,
- sends an hourly price report,
- draws price charts for different periods (day, week, month, 3 months, year) at the press of a button in the chat,
- supports user permissions and Cairo time.

Tech: Python, Flask, Telegram Bot API, PostgreSQL, Matplotlib. (The chart shown uses sample data.)`, tags: ['Python', 'Telegram API', 'Web Scraping'] }
];
window.flFill = async i => {
  const it = FLP[i], sl = ms => new Promise(r => setTimeout(r, ms));
  const sv = (el, v) => { const p = el.tagName == 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype; Object.getOwnPropertyDescriptor(p, 'value').set.call(el, v); el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('blur', { bubbles: true })); };
  const fi = document.querySelector('input[type=file]'); const dt = new DataTransfer();
  for (const n of it.imgs) { const b = await fetch('https://raw.githubusercontent.com/Mohamed-Harraz/tidebid/e7caa46/' + n + '.jpg').then(r => r.blob()); dt.items.add(new File([b], n + '.jpg', { type: 'image/jpeg' })); }
  fi.files = dt.files; fi.dispatchEvent(new Event('change', { bubbles: true }));
  await sl(6000);
  sv(document.querySelector('input[maxlength="36"]'), it.t);
  sv(document.querySelector('textarea[maxlength="2000"]'), it.d);
  return 'filled ' + it.t;
};
'fl loaded';
