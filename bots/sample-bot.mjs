#!/usr/bin/env node
// Tidebid sample bot. Node 18+ (built-in fetch), no dependencies.
//
//   node bots/sample-bot.mjs                       # quickplay vs 1 house bot
//   node bots/sample-bot.mjs --bots 3              # quickplay vs 3 house bots
//   node bots/sample-bot.mjs --join ABCD           # take a seat in an existing match
//   node bots/sample-bot.mjs --server http://localhost:8787
//
// Strategy: bid big on big treasure, dodge squalls with a low-middle card,
// and add a little noise so other players can't read it.

const args = Object.fromEntries(
  process.argv.slice(2).join(' ').split('--').filter(Boolean).map(s => {
    const [k, ...v] = s.trim().split(/\s+/);
    return [k, v.join(' ') || true];
  }),
);
const SERVER = (args.server || process.env.TIDEBID_SERVER || 'https://tidebid.example.workers.dev').replace(/\/$/, '');
const NAME = args.name || 'SampleBot';

async function api(method, path, body, token) {
  const res = await fetch(SERVER + path, {
    method,
    headers: {
      'content-type': 'application/json',
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`${data.error}: ${data.message}`);
  return data;
}

function chooseCard(state) {
  const hand = state.legalMoves;
  const n = hand.length;
  if (n === 1) return hand[0];
  const v = state.potValue;
  let target = v >= 0
    ? Math.min(1, v / 8) * (n - 1)
    : (0.25 + 0.35 * Math.min(1, -v / 3)) * (n - 1);
  target += (Math.random() - 0.5) * 2;
  return hand[Math.max(0, Math.min(n - 1, Math.round(target)))];
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const seat = args.join
    ? await api('POST', `/api/matches/${args.join}/join`, { name: NAME, kind: 'agent' })
    : await api('POST', '/api/quickplay', { name: NAME, kind: 'agent', bots: Number(args.bots) || 1 });
  const { code, token } = seat;
  console.log(`Seat ${seat.seat} in match ${code}. Watch: ${SERVER}/?watch=${code}`);

  let lastRound = 0;
  for (;;) {
    const s = await api('GET', `/api/matches/${code}`, null, token);
    if (s.lastRound && s.lastRound.round > lastRound) {
      lastRound = s.lastRound.round;
      const r = s.lastRound;
      const who = r.carried ? 'nobody (carried over)' : s.players[r.taker].name;
      console.log(`Round ${r.round}: pot ${r.value} -> ${who}. Bids ${JSON.stringify(r.bids)}`);
    }
    if (s.status === 'finished') {
      const winners = s.winners.map(i => s.players[i].name).join(', ');
      console.log('Final scores:', s.players.map(p => `${p.name} ${p.score}`).join(' | '));
      console.log('Winner:', winners);
      return;
    }
    if (s.yourTurn) {
      const card = chooseCard(s);
      await api('POST', `/api/matches/${code}/move`, { card }, token);
      console.log(`  bid ${card} on pot ${s.potValue}`);
    } else {
      await sleep(800);
    }
  }
}

main().catch(err => { console.error(err.message); process.exit(1); });
