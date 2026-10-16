// Cloudflare Worker entry (optional alternative to the Node server).
// Static pages are served directly; every /api call goes to one Durable
// Object that owns all match state.
import { DurableObject } from 'cloudflare:workers';
import INDEX_HTML from '../public/index.html';
import SAMPLE_BOT from './generated/sample-bot.txt';
import { handleApi, tokenFrom } from './api.js';

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, OPTIONS',
  'access-control-allow-headers': 'content-type, authorization',
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
    if (url.pathname === '/api' || url.pathname.startsWith('/api/')) {
      return env.LOBBY.get(env.LOBBY.idFromName('global')).fetch(request);
    }
    if (url.pathname === '/sample-bot.mjs') {
      return new Response(SAMPLE_BOT, { headers: { 'content-type': 'text/javascript; charset=utf-8', ...CORS } });
    }
    return new Response(INDEX_HTML, { headers: { 'content-type': 'text/html; charset=utf-8' } });
  },
};

const MATCH_TTL_MS = 24 * 60 * 60 * 1000;

export class Lobby extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    this.cache = new Map();
    this.store = {
      load: async code => {
        if (this.cache.has(code)) return this.cache.get(code);
        const m = await this.ctx.storage.get('m:' + code);
        if (m) this.cache.set(code, m);
        return m || null;
      },
      save: async m => {
        this.cache.set(m.code, m);
        await this.ctx.storage.put('m:' + m.code, m);
        if (!(await this.ctx.storage.getAlarm())) await this.ctx.storage.setAlarm(Date.now() + 60 * 60 * 1000);
      },
    };
  }

  // Hourly cleanup of old matches.
  async alarm() {
    const all = await this.ctx.storage.list({ prefix: 'm:' });
    const cutoff = Date.now() - MATCH_TTL_MS;
    const stale = [...all].filter(([, m]) => m.updated < cutoff).map(([k]) => k);
    for (const k of stale) this.cache.delete(k.slice(2));
    if (stale.length) await this.ctx.storage.delete(stale);
    if (all.size > stale.length) await this.ctx.storage.setAlarm(Date.now() + 60 * 60 * 1000);
  }

  async fetch(request) {
    const url = new URL(request.url);
    let body = {};
    if (request.method === 'POST') { try { body = await request.json(); } catch { body = {}; } }
    const token = tokenFrom(request.headers, body, url.searchParams);
    const { status, data } = await handleApi({ method: request.method, pathname: url.pathname, body, token }, this.store);
    return new Response(JSON.stringify(data, null, 2), {
      status,
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...CORS },
    });
  }
}
