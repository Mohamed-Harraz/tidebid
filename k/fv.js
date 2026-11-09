window.FV = [
  { t: 'Tracquill: PCB Photo to KiCad (AI)', imgs: ['p1_1', 'p1_2', 'p1_3'], src: 'e7caa46/', m: 9, y: 26,
    d: `A desktop app I built for reverse engineering printed circuit boards. You give it photos, flatbed scans or X-rays of a board and it:
- straightens the images and aligns the board layers,
- detects tracks, pads, vias and components with AI (YOLO, ONNX Runtime),
- rebuilds the netlist (electrical connections),
- offers manual CAD tools: continuity probe, net highlighting and an IC pinout helper,
- exports a complete KiCad project plus Gerber, Excellon drill files and a BOM.

The challenge was making AI detection reliable on real photos with glare, shadows and hidden tracks. I solved it with careful image alignment, several spectral views of the board, and an accuracy benchmark that every change must pass.

Runs on Windows and Linux with a one-click installer.
Tech: C++20, Qt 6/QML, OpenCV, ONNX Runtime.` },
  { t: 'Sales Pipeline Dashboard (Excel to KPIs)', imgs: ['spd1', 'spd2', 'spd3', 'spd4'], src: '59096c4/s/', m: 10, y: 26,
    d: `A Windows desktop app for sales managers that turns the Excel or CSV file they already have into a full sales pipeline dashboard in minutes.

- Smart import: recognises columns in English or Arabic, skips title rows, and an optional AI helper maps unusual columns.
- KPIs: pipeline value, weighted forecast, win rate, average deal size and sales cycle.
- Pipeline by stage, forecast against target (month or quarter) and performance per salesperson.
- "What changed": compares each import with the previous one (new deals, stage moves, wins, losses, pushed close dates).
- Deals at risk, follow-ups and notes for every deal with full history.
- One-click import templates, weekly report, PDF and Excel export, dark mode, filters.
- All data stays on the user's computer.

Tech: Python, pandas, pywebview, HTML/CSS/JavaScript, automated tests, single .exe with no install. (Screens show sample data.)` },
  { t: 'Bilingual E-commerce Store (Next.js)', imgs: ['p2_1', 'p2_2'], src: 'e7caa46/', m: 9, y: 26,
    d: `A complete online store for fishing gear in Egypt, designed and built from scratch:
- Arabic and English interface with full right-to-left support,
- responsive design for mobile and desktop with interactive animations,
- product catalogue with categories and search, cart and checkout,
- customer accounts and an admin panel for products, orders and images,
- PostgreSQL database and instant Telegram alerts for new orders.

The main challenge was making one design work well in both directions (LTR and RTL) without duplicating pages.

Tech: Next.js, React, TypeScript, PostgreSQL.` },
  { t: 'Fast Landing Site for a CAD Product', imgs: ['p3_1', 'p3_2'], src: 'e7caa46/', m: 10, y: 26,
    d: `Marketing and sales website for Tracquill, my PCB reverse-engineering software:
- modern dark design with a clear visual identity,
- pages for home, features, pricing, download, FAQ, support and legal,
- very fast: plain HTML, CSS and JavaScript, no framework,
- mobile responsive, scroll reveal effects and WebP images,
- full SEO setup (sitemap, Open Graph).` },
  { t: 'Telegram Bot: Gold Price Alerts & Charts', imgs: ['p5_1'], src: 'e7caa46/', m: 9, y: 26,
    d: `A Telegram bot running in the cloud:
- scrapes gold and silver prices every 5 minutes and stores them in a database,
- sends an hourly price report,
- draws price charts for different periods (day, week, month, 3 months, year) at the press of a button in the chat,
- supports user permissions and Cairo time.

Tech: Python, Flask, Telegram Bot API, PostgreSQL, Matplotlib. (The chart shown uses sample data.)` },
  { t: 'Tidebid: Real-time Multiplayer Web Game', imgs: ['p4_1', 'p4_2'], src: 'e7caa46/', m: 10, y: 26,
    d: `A fast 2-4 player strategy bidding game where humans and AI agents play in the same match:
- play against bots instantly, or create a match with a code and share it,
- round timer, match log, replay and spectator mode,
- full JSON API so any program or AI agent can play,
- deployed on Cloudflare Workers, with automated tests and a 4000-match simulation used to balance the game.

Tech: JavaScript, Node.js, Cloudflare Workers.` }
];
window.fvFill = async i => {
  const it = FV[i], sl = ms => new Promise(r => setTimeout(r, ms));
  const set = (el, v) => { const p = el.tagName == 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype; Object.getOwnPropertyDescriptor(p, 'value').set.call(el, v); el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); el.dispatchEvent(new Event('blur', { bubbles: true })); };
  set(document.querySelector('input[name=title]'), it.t);
  set(document.querySelector('textarea[name=overview]'), it.d);
  const fi = document.querySelector('input[name=attachments]'); const dt = new DataTransfer();
  for (const n of it.imgs) { const b = await fetch('https://raw.githubusercontent.com/Mohamed-Harraz/tidebid/' + it.src + n + '.jpg').then(r => r.blob()); dt.items.add(new File([b], n + '.jpg', { type: 'image/jpeg' })); }
  fi.files = dt.files; fi.dispatchEvent(new Event('change', { bubbles: true }));
  await sl(6000);
  return { t: it.t.length, d: it.d.length, imgs: document.querySelectorAll('img[src^="blob:"],img[src*="fiverr-res"],img[src*="cloudinary"]').length };
};
'fv loaded';
