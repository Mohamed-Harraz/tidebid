window.UP = [
  { t: 'Mini 2-Port VNA PCB (50 kHz - 300 MHz) in KiCad', r: 'Hardware designer (schematic + PCB)', imgs: ['u/vna_1', 'u/vna_2', 'u/vna_3'],
    sk: ['PCB Design', 'KiCad', 'Circuit Design', 'RF Engineering', 'STM32'],
    d: `A USB vector network analyzer board, NanoVNA-style. Si5351 makes the RF stimulus and LO, a resistive bridge and three SA612 mixers measure REF, S11 and S21, a WM8731 audio ADC digitizes the IF, and an STM32F072 streams data over USB. 82 parts on an 80 x 60 mm 2-layer board with SMA ports, GND pours and stitching vias. Schematic checked pin by pin, DRC clean, Gerbers and BOM ready for JLCPCB.` },
  { t: 'Smart-Home Voice Satellite PCB (ESP32-S3)', r: 'Hardware designer (schematic + PCB)', imgs: ['u/voice_sat_1', 'u/voice_sat_2', 'u/voice_sat_3'],
    sk: ['PCB Design', 'KiCad', 'ESP32', 'Embedded Systems', 'Internet of Things'],
    d: `A room voice assistant board for Home Assistant (ESPHome). ESP32-S3 with native USB-C, two ICS-43434 I2S MEMS mics, MAX98357A speaker amp, 12-LED WS2812 status ring, LD2410C mmWave presence sensor, SHT40 temperature/humidity and a hardware privacy switch that cuts mic power. Power tree and mic filter verified in SPICE (ngspice) before layout. DRC clean, ready for assembly.` },
  { t: 'ESP32 Smart-Home Node PCB', r: 'Hardware designer (schematic + PCB)', imgs: ['u/esp32_node_1', 'u/esp32_node_2', 'u/esp32_node_3'],
    sk: ['PCB Design', 'KiCad', 'ESP32', 'Circuit Design', 'Internet of Things'],
    d: `A compact 50 x 50 mm IoT node: ESP32-WROOM-32E with antenna keep-out, 5 V input and AMS1117 3.3 V regulator, reset and boot buttons, power and status LEDs, a UART programming header and a 4-pin GPIO header for sensors or relays. 2-layer board, autorouted with full GND pours, 0 DRC errors, Gerber, drill, BOM and pick-and-place files generated.` },
  { t: 'KiCad PCB Automation Pipeline (Python)', r: 'Developer', imgs: ['u/pipeline_1', 'u/esp32_node_3'],
    sk: ['Python', 'KiCad', 'PCB Design', 'Automation', 'Electronic Design Automation'],
    d: `A tool I built to design boards from two small Python files. One command makes the KiCad schematic, checks every pin against the design, places footprints, routes with Freerouting, adds GND pours and stitching vias, repairs cut-off ground islands, runs DRC and exports fab files. It also runs SPICE checks with ngspice. All three boards in my portfolio were made with it.` },
  { t: 'Tracquill: AI PCB Reverse Engineering App', r: 'Tech team leader', imgs: ['p1_1', 'p1_2', 'p1_3'],
    sk: ['C++', 'Qt', 'Computer Vision', 'OpenCV', 'PCB Design'],
    d: `A desktop app that turns photos, scans and X-rays of a circuit board into a complete KiCad project. It aligns the board layers, detects tracks, pads, vias and parts with YOLO models on ONNX Runtime, rebuilds the netlist and exports KiCad, Gerber, Excellon and BOM. Includes a continuity probe, net highlighting and an IC pinout helper. Windows and Linux installers. C++20, Qt 6, OpenCV.` },
  { t: 'Sales Pipeline Dashboard (Excel to KPIs)', r: 'Developer', imgs: ['s/spd1', 's/spd2', 's/spd3', 's/spd4'],
    sk: ['Python', 'Dashboard', 'Data Visualization', 'pandas', 'Desktop Application'],
    d: `A Windows app that turns a sales Excel or CSV file into a pipeline dashboard in minutes. Smart import with English or Arabic headers, KPIs (pipeline value, weighted forecast, win rate, cycle time), forecast vs target, per-salesperson view, "what changed" between imports, deals at risk, notes and follow-ups, PDF and Excel export. Data stays on the user's PC. Python, pandas, pywebview. Screens show sample data.` },
  { t: 'Bilingual E-commerce Store (Next.js)', r: 'Full-stack developer', imgs: ['p2_1', 'p2_2'],
    sk: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Ecommerce Website'],
    d: `A complete online store for fishing gear in Egypt, built from scratch. Arabic and English with full right-to-left support, responsive design with animations, product catalogue with categories and search, cart and checkout, customer accounts, an admin panel for products, orders and images, and instant Telegram alerts for new orders. Next.js, React, TypeScript, PostgreSQL.` },
  { t: 'Telegram Bot: Gold Price Alerts and Charts', r: 'Developer', imgs: ['p5_1'],
    sk: ['Python', 'Telegram API', 'Web Scraping', 'PostgreSQL', 'Bot Development'],
    d: `A cloud Telegram bot that scrapes gold and silver prices every 5 minutes, stores them in PostgreSQL, sends an hourly report and draws price charts for a day, week, month, 3 months or a year at the press of a button. Supports user permissions and Cairo time. Python, Flask, Matplotlib. The chart shown uses sample data.` },
  { t: 'Tidebid: Real-time Multiplayer Web Game + API', r: 'Developer', imgs: ['p4_1', 'p4_2'],
    sk: ['JavaScript', 'Node.js', 'API Development', 'Game Development', 'Cloudflare'],
    d: `A 2-4 player strategy bidding game where humans and AI agents play in the same match. Instant games against bots or private matches with a code, round timer, match log, replay and spectator mode, and a full JSON API so any program can play. Deployed on Cloudflare Workers with automated tests and a 4000-match simulation used to balance the rules.` },
  { t: 'Fast Landing Site for a CAD Product', r: 'Web designer and developer', imgs: ['p3_1', 'p3_2'],
    sk: ['HTML', 'CSS', 'JavaScript', 'Landing Page', 'Web Design'],
    d: `Marketing and sales website for Tracquill. Modern dark design, pages for home, features, pricing, download, FAQ, support and legal. Plain HTML, CSS and JavaScript with no framework, so it loads very fast. Mobile responsive, scroll-reveal effects, WebP images and a full SEO setup with sitemap and Open Graph tags.` }
];
window.upText = i => {
  const it = UP[i];
  const set = (el, v) => { Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(el, v); el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); el.dispatchEvent(new Event('blur', { bubbles: true })); };
  const tas = [...document.querySelectorAll('textarea')].filter(e => e.offsetParent);
  set(tas[0], it.t); set(tas[1], it.r); set(tas[2], it.d);
  return { t: it.t.length, r: it.r.length, d: it.d.length };
};
window.upImgs = async i => {
  const it = UP[i];
  const fi = [...document.querySelectorAll('input[type=file]')].find(f => /image/.test(f.accept));
  const dt = new DataTransfer();
  for (const n of it.imgs) { const b = await fetch('https://raw.githubusercontent.com/Mohamed-Harraz/tidebid/' + (n.startsWith('u/') ? '6e5f723/' : n.startsWith('s/') ? '59096c4/' : 'e7caa46/') + n + '.jpg').then(r => r.blob()); dt.items.add(new File([b], n.split('/').pop() + '.jpg', { type: 'image/jpeg' })); }
  fi.files = dt.files; fi.dispatchEvent(new Event('change', { bubbles: true }));
  return dt.files.length;
};
'up loaded';
window.upPublish = async () => {
  const sl = ms => new Promise(r => setTimeout(r, ms));
  const btn = re => [...document.querySelectorAll('button')].filter(b => b.offsetParent && re.test(b.textContent.trim())).pop();
  let b = btn(/^Next: Preview$/); if (!b) return 'no preview btn'; b.click(); await sl(2500);
  b = btn(/^Next: Thumbnail$/); if (!b) return 'no thumb btn: ' + [...document.querySelectorAll('[role=dialog]')].map(d => d.innerText.slice(0, 200)).join(' || '); b.click(); await sl(2500);
  b = btn(/^Publish$/); if (!b) return 'no publish btn'; b.click(); await sl(5000);
  const ok = [...document.querySelectorAll('[role=dialog]')].some(d => /is published/.test(d.innerText));
  const done = btn(/^Done$/); if (done) done.click(); await sl(1500);
  return ok ? 'published' : 'unknown: ' + [...document.querySelectorAll('[role=dialog]')].map(d => d.innerText.slice(0, 200)).join(' || ');
};
window.upStart = async i => {
  const sl = ms => new Promise(r => setTimeout(r, ms));
  [...document.querySelectorAll('button')].find(b => b.getAttribute('aria-label') === 'Add portfolio').click(); await sl(3000);
  const a = upText(i); await upImgs(i); await sl(9000);
  const s = document.querySelector('[role=dialog] input[type=search]'); s.scrollIntoView({ block: 'center' }); const r = s.getBoundingClientRect();
  return [a, [...document.querySelectorAll('[role=dialog] img')].filter(x => x.naturalWidth > 300).length, Math.round(r.x + 60), Math.round(r.y + r.height / 2), UP[i].sk];
};
