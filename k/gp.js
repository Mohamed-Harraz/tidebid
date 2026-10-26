window.GP = [
  { t: 'Tracquill: PCB Photo to KiCad Software (AI)', imgs: ['p1_1', 'p1_2', 'p1_3'],
    h: `<p>A desktop app I built for reverse engineering printed circuit boards. You give it photos, flatbed scans or X-rays of a board and it:</p><ul><li>straightens the images and aligns the board layers,</li><li>detects tracks, pads, vias and components with AI (YOLO, ONNX Runtime),</li><li>rebuilds the netlist (electrical connections),</li><li>offers manual CAD tools: continuity probe, net highlighting and an IC pinout helper,</li><li>exports a complete KiCad project plus Gerber, Excellon drill files and a BOM.</li></ul><p>Runs on Windows and Linux with a one-click installer.</p><p><strong>Tech:</strong> C++20, Qt 6/QML, OpenCV, ONNX Runtime.</p>` },
  { t: 'Bilingual E-commerce Store (Next.js)', imgs: ['p2_1', 'p2_2'],
    h: `<p>A complete online store for fishing gear in Egypt, designed and built from scratch:</p><ul><li>Arabic and English interface with full right-to-left support,</li><li>responsive design for mobile and desktop with interactive animations,</li><li>product catalogue with categories and search, cart and checkout,</li><li>customer accounts and an admin panel for products, orders and images,</li><li>PostgreSQL database and instant Telegram alerts for new orders.</li></ul><p><strong>Tech:</strong> Next.js, React, TypeScript, PostgreSQL.</p>` },
  { t: 'Fast Landing Site for a CAD Product', imgs: ['p3_1', 'p3_2'],
    h: `<p>Marketing and sales website for Tracquill, my PCB reverse-engineering software:</p><ul><li>modern dark design with a clear visual identity,</li><li>pages for home, features, pricing, download, FAQ, support and legal,</li><li>very fast: plain HTML, CSS and JavaScript, no framework,</li><li>mobile responsive, scroll reveal effects and WebP images,</li><li>full SEO setup (sitemap, Open Graph).</li></ul>` },
  { t: 'Tidebid: Real-time Multiplayer Web Game with API', imgs: ['p4_1', 'p4_2'],
    h: `<p>A fast 2-4 player strategy bidding game where humans and AI agents play in the same match:</p><ul><li>play against bots instantly, or create a match with a code and share it,</li><li>round timer, match log, replay and spectator mode,</li><li>full JSON API so any program or AI agent can play,</li><li>deployed on Cloudflare Workers, with automated tests and a 4000-match simulation used to balance the game.</li></ul><p><strong>Tech:</strong> JavaScript, Node.js, Cloudflare Workers.</p>` },
  { t: 'Telegram Bot: Gold Price Alerts and Charts', imgs: ['p5_1'],
    h: `<p>A Telegram bot running in the cloud:</p><ul><li>scrapes gold and silver prices every 5 minutes and stores them in a database,</li><li>sends an hourly price report,</li><li>draws price charts for different periods (day, week, month, 3 months, year) at the press of a button in the chat,</li><li>supports user permissions and Cairo time.</li></ul><p><strong>Tech:</strong> Python, Flask, Telegram Bot API, PostgreSQL, Matplotlib. (The chart shown uses sample data.)</p>` }
];
window.gpText = async i => {
  const it = GP[i], sl = ms => new Promise(r => setTimeout(r, ms));
  const btn = w => [...document.querySelectorAll('button,a')].filter(b => b.textContent.trim() === w && b.offsetParent).pop();
  window.__W = window.__W || [];
  if (!cloudinary.__p) { const o = cloudinary.createUploadWidget; cloudinary.__p = 1; cloudinary.createUploadWidget = function () { const w = o.apply(this, arguments); window.__W.push(w); return w; }; }
  const ti = document.querySelector('input[maxlength="190"]');
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(ti, it.t); ti.dispatchEvent(new Event('input', { bubbles: true }));
  if (!document.querySelector('.fr-element')) { btn('Text').click(); await sl(1500); }
  const ed = document.querySelector('.fr-element'); ed.innerHTML = it.h; ed.dispatchEvent(new Event('input', { bubbles: true }));
  ed.scrollIntoView({ block: 'center' }); const r = ed.getBoundingClientRect();
  return [Math.round(r.x + r.width / 2), Math.round(r.y + r.height - 12)];
};
window.gpImgs = async i => {
  const it = GP[i], sl = ms => new Promise(r => setTimeout(r, ms));
  const btn = w => [...document.querySelectorAll('button,a')].filter(b => b.textContent.trim() === w && b.offsetParent).pop();
  btn('Save').click(); await sl(1200);
  for (const n of it.imgs) {
    btn('ADD').click(); await sl(800);
    btn('Media').click(); await sl(2500);
    const w = window.__W[window.__W.length - 1];
    const b = await fetch('https://raw.githubusercontent.com/Mohamed-Harraz/tidebid/e7caa46/' + n + '.jpg').then(r => r.blob());
    w.open(null, { files: [new File([b], n + '.jpg', { type: 'image/jpeg' })] }); await sl(9000);
  }
  return { title: document.querySelector('input[maxlength="190"]').value, imgs: document.querySelectorAll('img[src*="cloudinary"]').length, sections: (document.body.innerText.match(/Edit\s+Remove/g) || []).length };
};
'gp loaded';
