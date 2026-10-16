// Match lifecycle on top of the pure engine: seats, tokens, lobby, bots,
// turn timer and the JSON views sent to players.
import {
  newGame, submitBid, closeRound, houseBotMove, legalCards, potValue,
  GameError, MIN_SEATS, MAX_SEATS, HAND, PRIZES, RULES_TEXT,
} from './engine.js';

export const TURN_SECONDS = 45;
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
const BOT_NAMES = ['Gull', 'Barnacle', 'Kelp', 'Driftwood', 'Pelican', 'Skipper'];

export function randomCode(rand = Math.random) {
  let s = '';
  for (let i = 0; i < 4; i++) s += CODE_ALPHABET[Math.floor(rand() * CODE_ALPHABET.length)];
  return s;
}

export function randomToken() {
  const b = new Uint8Array(16);
  crypto.getRandomValues(b);
  return [...b].map(x => x.toString(16).padStart(2, '0')).join('');
}

function cleanName(name, fallback) {
  const n = String(name ?? '').replace(/[^\p{L}\p{N} _.\-]/gu, '').trim().slice(0, 20);
  return n || fallback;
}

export function createMatch({ code, seats = 2, name, kind = 'human', now = Date.now() }) {
  seats = Number(seats);
  if (!Number.isInteger(seats) || seats < MIN_SEATS || seats > MAX_SEATS) {
    throw new GameError('bad_seats', `seats must be ${MIN_SEATS}-${MAX_SEATS}`);
  }
  const m = {
    code,
    created: now,
    updated: now,
    version: 1,
    status: 'lobby',
    seatCount: seats,
    players: [],
    game: null,
    deadline: null,
  };
  const p = addPlayer(m, { name, kind });
  return { match: m, player: p };
}

function addPlayer(m, { name, kind = 'human', bot = false }) {
  if (m.status !== 'lobby') throw new GameError('not_joinable', 'This match has already started.');
  if (m.players.length >= m.seatCount) throw new GameError('match_full', 'All seats are taken.');
  const seat = m.players.length;
  const k = bot ? 'bot' : (kind === 'agent' ? 'agent' : 'human');
  const p = {
    seat,
    name: cleanName(name, bot ? BOT_NAMES[seat % BOT_NAMES.length] + ' (bot)' : `Player ${seat + 1}`),
    kind: k,
    token: bot ? null : randomToken(),
  };
  m.players.push(p);
  return p;
}

export function joinMatch(m, { name, kind }, now = Date.now()) {
  const p = addPlayer(m, { name, kind });
  touch(m, now);
  if (m.players.length === m.seatCount) start(m, now);
  return p;
}

export function startMatch(m, token, now = Date.now()) {
  const p = playerByToken(m, token);
  if (p.seat !== 0) throw new GameError('not_host', 'Only the match creator can start it.');
  if (m.status !== 'lobby') throw new GameError('already_started', 'The match has already started.');
  while (m.players.length < m.seatCount) addPlayer(m, { bot: true });
  start(m, now);
}

function start(m, now) {
  m.status = 'playing';
  m.game = newGame(m.players, Math.floor(Math.random() * 2 ** 31) + 1);
  beginRound(m, now);
  touch(m, now);
}

function beginRound(m, now) {
  m.deadline = now + TURN_SECONDS * 1000;
  for (const p of m.players) {
    if (p.kind === 'bot') submitBid(m.game, p.seat, houseBotMove(m.game, p.seat));
  }
  maybeClose(m, now);
}

function maybeClose(m, now) {
  const g = m.game;
  if (Object.keys(g.bids).length < m.players.length) return;
  closeRound(g);
  if (g.finished) {
    m.status = 'finished';
    m.deadline = null;
  } else {
    beginRound(m, now);
  }
}

export function playMove(m, token, card, now = Date.now()) {
  const p = playerByToken(m, token);
  if (m.status === 'lobby') throw new GameError('not_started', 'Waiting for players. The host can start and fill empty seats with bots.');
  if (m.status === 'finished') throw new GameError('match_finished', 'The match is over.');
  const round = m.game.round;
  submitBid(m.game, p.seat, Number(card));
  maybeClose(m, now);
  touch(m, now);
  return round;
}

// If the turn timer ran out, idle players play a random card so a match never stalls.
export function tick(m, now = Date.now()) {
  if (m.status !== 'playing' || !m.deadline || now < m.deadline) return false;
  const g = m.game;
  for (const p of m.players) {
    if (g.bids[p.seat] === undefined) {
      const hand = g.hands[p.seat];
      submitBid(g, p.seat, hand[Math.floor(Math.random() * hand.length)]);
      g.timeouts = g.timeouts || [];
      g.timeouts.push({ round: g.round, seat: p.seat });
    }
  }
  maybeClose(m, now);
  touch(m, now);
  return true;
}

function touch(m, now) { m.updated = now; m.version += 1; }

export function playerByToken(m, token) {
  const p = token && m.players.find(x => x.token && x.token === token);
  if (!p) throw new GameError('bad_token', 'Unknown player token for this match.');
  return p;
}

export function findPlayer(m, token) {
  return (token && m.players.find(x => x.token && x.token === token)) || null;
}

// What a given viewer is allowed to see. Other players' bids stay hidden
// until the round resolves.
export function view(m, token, now = Date.now()) {
  const me = findPlayer(m, token);
  const g = m.game;
  const v = {
    code: m.code,
    status: m.status,
    version: m.version,
    seats: m.seatCount,
    you: me ? { seat: me.seat, name: me.name, isHost: me.seat === 0 } : null,
    players: m.players.map(p => ({
      seat: p.seat,
      name: p.name,
      kind: p.kind,
      score: g ? g.scores[p.seat] : 0,
      cardsLeft: g ? g.hands[p.seat].length : HAND.length,
      hasBid: g ? g.bids[p.seat] !== undefined : false,
      won: g ? g.won[p.seat] : [],
    })),
  };
  if (g) {
    v.round = g.round;
    v.totalRounds = g.totalRounds;
    v.pot = g.pot;
    v.potValue = potValue(g.pot);
    v.potKind = m.status === 'finished' ? null : (potValue(g.pot) >= 0 ? 'treasure' : 'squall');
    v.prizesLeft = g.deck.slice(1).sort((a, b) => a - b);
    v.lastRound = g.history.length ? g.history[g.history.length - 1] : null;
    v.deadline = m.deadline;
    v.secondsLeft = m.deadline ? Math.max(0, Math.ceil((m.deadline - now) / 1000)) : null;
    if (me) {
      v.yourHand = g.hands[me.seat].slice().sort((a, b) => a - b);
      v.yourBid = g.bids[me.seat] ?? null;
      v.yourTurn = m.status === 'playing' && g.bids[me.seat] === undefined;
      v.legalMoves = v.yourTurn ? legalCards(g, me.seat).sort((a, b) => a - b) : [];
    }
    if (m.status === 'finished') v.winners = g.winners;
  }
  return v;
}

export function log(m) {
  const g = m.game;
  return {
    code: m.code,
    status: m.status,
    players: m.players.map(p => ({ seat: p.seat, name: p.name, kind: p.kind })),
    seed: g ? g.seed : null,
    rounds: g ? g.history : [],
    timeouts: g?.timeouts || [],
    finalScores: g ? g.scores : null,
    winners: g?.finished ? g.winners : null,
  };
}

export const API_DOC = {
  name: 'Tidebid API',
  rules: RULES_TEXT,
  cards: HAND,
  prizes: PRIZES,
  turnSeconds: TURN_SECONDS,
  auth: 'Each join returns a token. Send it as "Authorization: Bearer <token>" (or ?token=<token> on GET).',
  endpoints: [
    { method: 'POST', path: '/api/matches', body: '{ "seats": 2-4, "name": "you", "kind": "agent"|"human" }', returns: 'code, token, seat, state' },
    { method: 'POST', path: '/api/matches/{code}/join', body: '{ "name": "you", "kind": "agent" }', returns: 'token, seat, state' },
    { method: 'POST', path: '/api/matches/{code}/start', auth: 'host token', returns: 'state (empty seats filled with bots)' },
    { method: 'POST', path: '/api/quickplay', body: '{ "name": "you", "kind": "agent", "bots": 1-3 }', returns: 'a started match against house bots' },
    { method: 'GET', path: '/api/matches/{code}', auth: 'optional token', returns: 'state; yourHand, yourTurn and legalMoves when authenticated' },
    { method: 'POST', path: '/api/matches/{code}/move', auth: 'token', body: '{ "card": 7 }', returns: 'state' },
    { method: 'GET', path: '/api/matches/{code}/log', returns: 'full round-by-round log for replays' },
  ],
  loop: 'Poll GET /api/matches/{code} about once a second. When yourTurn is true, POST a card from legalMoves.',
};
