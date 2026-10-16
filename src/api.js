// HTTP API logic shared by the Node server (Render) and the Cloudflare Worker.
// `store` needs: load(code) -> match|null, save(match).
import { GameError } from './engine.js';
import {
  createMatch, joinMatch, startMatch, playMove, tick, view, log,
  randomCode, API_DOC,
} from './match.js';

async function newCode(store) {
  for (let i = 0; i < 50; i++) {
    const c = randomCode();
    if (!(await store.load(c))) return c;
  }
  throw new GameError('busy', 'Could not allocate a match code, try again.');
}

// Returns { status, data }.
export async function handleApi({ method, pathname, body = {}, token = '' }, store) {
  const parts = pathname.replace(/\/+$/, '').split('/').filter(Boolean); // ['api', ...]
  try {
    if (parts.length === 1) return { status: 200, data: API_DOC };
    if (parts[1] === 'rules') return { status: 200, data: { rules: API_DOC.rules, cards: API_DOC.cards, prizes: API_DOC.prizes } };

    if (parts[1] === 'quickplay' && method === 'POST') {
      const bots = Math.max(1, Math.min(3, Number(body.bots) || 1));
      const code = await newCode(store);
      const { match, player } = createMatch({ code, seats: bots + 1, name: body.name, kind: body.kind });
      startMatch(match, player.token);
      await store.save(match);
      return { status: 201, data: { code, token: player.token, seat: player.seat, state: view(match, player.token) } };
    }

    if (parts[1] !== 'matches') throw new GameError('not_found', 'No such endpoint. See GET /api');

    if (parts.length === 2 && method === 'POST') {
      const code = await newCode(store);
      const { match, player } = createMatch({ code, seats: body.seats ?? 2, name: body.name, kind: body.kind });
      await store.save(match);
      return { status: 201, data: { code, token: player.token, seat: player.seat, state: view(match, player.token) } };
    }

    const m = await store.load(String(parts[2] || '').toUpperCase());
    if (!m) throw new GameError('not_found', 'No match with that code.');
    if (tick(m)) await store.save(m);
    const action = parts[3];

    if (!action && method === 'GET') return { status: 200, data: view(m, token) };
    if (action === 'log' && method === 'GET') return { status: 200, data: log(m) };
    if (action === 'join' && method === 'POST') {
      const p = joinMatch(m, { name: body.name, kind: body.kind });
      await store.save(m);
      return { status: 201, data: { code: m.code, token: p.token, seat: p.seat, state: view(m, p.token) } };
    }
    if (action === 'start' && method === 'POST') {
      startMatch(m, token);
      await store.save(m);
      return { status: 200, data: view(m, token) };
    }
    if (action === 'move' && method === 'POST') {
      playMove(m, token, body.card);
      await store.save(m);
      return { status: 200, data: view(m, token) };
    }
    throw new GameError('not_found', 'No such endpoint. See GET /api');
  } catch (err) {
    if (err instanceof GameError) return { status: err.code === 'not_found' ? 404 : 400, data: { error: err.code, message: err.message } };
    return { status: 500, data: { error: 'server_error', message: 'Something went wrong.' } };
  }
}

export function tokenFrom(headers, body, searchParams) {
  const auth = headers.get ? headers.get('authorization') : headers.authorization;
  return ((auth || '').startsWith('Bearer ') ? auth.slice(7) : '') || body?.token || searchParams.get('token') || '';
}
