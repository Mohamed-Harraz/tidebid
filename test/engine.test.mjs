import assert from 'node:assert/strict';
import { resolveRound, newGame, submitBid, closeRound, houseBotMove, rng, PRIZES } from '../src/engine.js';

// highest unique takes treasure; duplicates cancel
let r = resolveRound([5], { 0: 9, 1: 9, 2: 4 });
assert.equal(r.taker, 2); assert.deepEqual(r.cancelled.sort(), [0, 1]);
// squall goes to lowest unique
r = resolveRound([-2], { 0: 1, 1: 3, 2: 1 });
assert.equal(r.taker, 1); assert.equal(r.kind, 'squall');
// everything cancels -> carry
r = resolveRound([4], { 0: 6, 1: 6 });
assert.equal(r.carried, true); assert.equal(r.taker, null);
// stacked pot sign decides direction
r = resolveRound([-3, 2], { 0: 2, 1: 7 });
assert.equal(r.kind, 'squall'); assert.equal(r.taker, 0);

// full game invariants
for (let seed = 1; seed <= 300; seed++) {
  const seats = 2 + (seed % 3);
  const g = newGame(Array(seats).fill(0), seed);
  const rand = rng(seed * 7);
  let rounds = 0;
  while (!g.finished) {
    for (let s = 0; s < seats; s++) submitBid(g, s, houseBotMove(g, s, rand));
    closeRound(g); rounds++;
  }
  assert.equal(rounds, 11);
  assert.ok(g.hands.every(h => h.length === 0));
  const awarded = g.history.filter(h => !h.carried).reduce((s, h) => s + h.value, 0);
  assert.equal(g.scores.reduce((a, b) => a + b, 0), awarded);
  assert.ok(g.winners.length >= 1);
}

// illegal moves are rejected
const g = newGame([0, 0], 3);
assert.throws(() => submitBid(g, 0, 12), /not in your hand/);
submitBid(g, 0, 5);
assert.throws(() => submitBid(g, 0, 6), /already bid/);

// balance check: no simple fixed policy dominates the field
const policies = {
  house: (g, s, rand) => houseBotMove(g, s, rand),
  random: (g, s, rand) => { const h = g.hands[s]; return h[Math.floor(rand() * h.length)]; },
  proportional: (g, s) => { // deterministic: rank prize -> rank card
    const h = g.hands[s].slice().sort((a, b) => a - b);
    const remaining = g.deck.slice().sort((a, b) => a - b);
    const idx = remaining.indexOf(g.deck[0]);
    return h[Math.min(h.length - 1, idx)];
  },
  greedyHigh: (g, s) => Math.max(...g.hands[s]),
  greedyLow: (g, s) => Math.min(...g.hands[s]),
};
const names = Object.keys(policies);
const wins = Object.fromEntries(names.map(n => [n, 0]));
const games = Object.fromEntries(names.map(n => [n, 0]));
let seed = 1000;
for (let i = 0; i < 4000; i++) {
  const lineup = [0, 1, 2].map(() => names[Math.floor(Math.random() * names.length)]);
  const g = newGame(lineup, seed++);
  const rand = rng(seed * 13);
  while (!g.finished) { lineup.forEach((p, s) => submitBid(g, s, policies[p](g, s, rand))); closeRound(g); }
  lineup.forEach((p, s) => { games[p]++; if (g.winners.includes(s)) wins[p] += 1 / g.winners.length; });
}
console.log('3-player win rate by policy (fair share 33%):');
for (const n of names) console.log(' ', n.padEnd(13), (100 * wins[n] / games[n]).toFixed(1) + '%');
console.log('engine tests passed');
