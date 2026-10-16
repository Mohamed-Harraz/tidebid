// Node server for hosts like Render: serves the game page, the sample bot and
// the JSON API. No dependencies. Matches live in memory.
import http from 'node:http';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { handleApi, tokenFrom } from './api.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const INDEX_HTML = readFileSync(root + 'public/index.html');
const SAMPLE_BOT = readFileSync(root + 'bots/sample-bot.mjs');
const PORT = Number(process.env.PORT) || 8787;
const MATCH_TTL_MS = 24 * 60 * 60 * 1000;

const matches = new Map();
const store = {
  load: async code => matches.get(code) || null,
  save: async m => { matches.set(m.code, m); },
};

// Drop matches nobody has touched for a day.
setInterval(() => {
  const cutoff = Date.now() - MATCH_TTL_MS;
  for (const [code, m] of matches) if (m.updated < cutoff) matches.delete(code);
}, 60 * 60 * 1000).unref();

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, OPTIONS',
  'access-control-allow-headers': 'content-type, authorization',
};

function readBody(req) {
  return new Promise(resolve => {
    let data = '';
    req.on('data', chunk => { data += chunk; if (data.length > 1e5) req.destroy(); });
    req.on('end', () => { try { resolve(data ? JSON.parse(data) : {}); } catch { resolve({}); } });
    req.on('error', () => resolve({}));
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (req.method === 'OPTIONS') { res.writeHead(204, CORS); return res.end(); }

  if (url.pathname === '/api' || url.pathname.startsWith('/api/')) {
    const body = req.method === 'POST' ? await readBody(req) : {};
    const token = tokenFrom(req.headers, body, url.searchParams);
    const { status, data } = await handleApi({ method: req.method, pathname: url.pathname, body, token }, store);
    res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...CORS });
    return res.end(JSON.stringify(data, null, 2));
  }
  if (url.pathname === '/sample-bot.mjs') {
    res.writeHead(200, { 'content-type': 'text/javascript; charset=utf-8', ...CORS });
    return res.end(SAMPLE_BOT);
  }
  if (url.pathname === '/healthz') { res.writeHead(200); return res.end('ok'); }
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  res.end(INDEX_HTML);
});

server.listen(PORT, () => console.log(`Tidebid running on http://localhost:${PORT}`));
