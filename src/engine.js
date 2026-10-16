// Tidebid game engine. Pure functions over plain JSON state, no I/O.
// Rules: every player holds bid cards 1..11. Each round a prize is revealed.
// Everyone bids one card at the same time. Duplicate bids cancel each other.
// A positive (treasure) pot goes to the highest unique bid; a negative
// (squall) pot is forced on the lowest unique bid. If every bid is cancelled
// the pot carries over and stacks with the next prize. Highest score after
// 11 rounds wins.

export const HAND = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
export const PRIZES = [-3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8];
export const MIN_SEATS = 2;
export const MAX_SEATS = 4;

// Small deterministic PRNG so a match can be replayed from its seed.
export function rng(seed) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13; s >>>= 0;
    s ^= s >> 17;
    s ^= s << 5; s >>>= 0;
    return s / 4294967296;
  };
}

export function shuffle(arr, rand) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function potValue(pot) {
  return pot.reduce((s, v) => s + v, 0);
}

// Decide one round. bids: { [seat]: card }. Returns the outcome only.
export function resolveRound(pot, bids) {
  const counts = {};
  for (const card of Object.values(bids)) counts[card] = (counts[card] || 0) + 1;
  const unique = Object.entries(bids)
    .filter(([, card]) => counts[card] === 1)
    .map(([seat, card]) => ({ seat: Number(seat), card }));
  const cancelled = Object.entries(bids)
    .filter(([, card]) => counts[card] > 1)
    .map(([seat]) => Number(seat));
  const value = potValue(pot);
  const kind = value >= 0 ? 'treasure' : 'squall';
  if (unique.length === 0) {
    return { kind, value, taker: null, cancelled, carried: true };
  }
  unique.sort((a, b) => a.card - b.card);
  const pick = kind === 'treasure' ? unique[unique.length - 1] : unique[0];
  return { kind, value, taker: pick.seat, takerCard: pick.card, cancelled, carried: false };
}

export function newGame(seats, seed) {
  const rand = rng(seed);
  const deck = shuffle(PRIZES, rand);
  return {
    seed,
    round: 1,
    totalRounds: deck.length,
    deck,                       // remaining prizes; deck[0] is on the table
    pot: [deck[0]],             // prizes currently at stake (carry-overs stack)
    hands: seats.map(() => HAND.slice()),
    scores: seats.map(() => 0),
    won: seats.map(() => []),   // prize values each seat collected
    bids: {},                   // hidden until everyone has bid
    history: [],
    finished: false,
    winners: [],
  };
}

export function legalCards(game, seat) {
  return game.finished ? [] : game.hands[seat].slice();
}

export function submitBid(game, seat, card) {
  if (game.finished) throw new GameError('match_finished', 'The match is over.');
  if (game.bids[seat] !== undefined) throw new GameError('already_bid', 'You already bid this round.');
  if (!Number.isInteger(card) || !game.hands[seat].includes(card)) {
    throw new GameError('illegal_card', `Card ${card} is not in your hand. Legal: ${game.hands[seat].join(',')}`);
  }
  game.bids[seat] = card;
  return Object.keys(game.bids).length === game.hands.length;
}

// Call once every seat has bid.
export function closeRound(game) {
  const bids = game.bids;
  const outcome = resolveRound(game.pot, bids);
  for (const [seat, card] of Object.entries(bids)) {
    const h = game.hands[seat];
    h.splice(h.indexOf(card), 1);
  }
  const record = {
    round: game.round,
    pot: game.pot.slice(),
    bids: { ...bids },
    ...outcome,
  };
  if (!outcome.carried) {
    game.scores[outcome.taker] += outcome.value;
    game.won[outcome.taker].push(...game.pot);
  }
  game.history.push(record);
  game.bids = {};
  game.deck.shift();
  if (game.deck.length === 0) {
    finish(game, outcome.carried ? record : null);
  } else {
    game.round += 1;
    game.pot = outcome.carried ? [...game.pot, game.deck[0]] : [game.deck[0]];
  }
  return record;
}

function finish(game, discardedRecord) {
  game.finished = true;
  game.pot = [];
  if (discardedRecord) discardedRecord.discarded = true;
  const best = Math.max(...game.scores);
  game.winners = game.scores.map((s, i) => (s === best ? i : -1)).filter(i => i >= 0);
}

// House bot. Plays the prize roughly in proportion to its size, keeps some
// randomness so it can't be read, and avoids burning its top cards on scraps.
export function houseBotMove(game, seat, rand = Math.random) {
  const hand = game.hands[seat].slice().sort((a, b) => a - b);
  if (hand.length === 1) return hand[0];
  const v = potValue(game.pot);
  const n = hand.length;
  let target;
  if (v >= 0) {
    // bigger treasure -> higher card. Max prize ~8, carried pots can exceed it.
    const strength = Math.min(1, v / 8);
    target = strength * (n - 1);
  } else {
    // squall: try to be unique but not lowest -> aim low-middle
    const pain = Math.min(1, -v / 3);
    target = (0.25 + 0.35 * pain) * (n - 1);
  }
  const noise = (rand() - 0.5) * Math.max(1.5, n / 3);
  const idx = Math.max(0, Math.min(n - 1, Math.round(target + noise)));
  return hand[idx];
}

export class GameError extends Error {
  constructor(code, message) { super(message); this.code = code; }
}

export const RULES_TEXT =
  'Everyone holds bid cards 1 to 11. Each round one prize card is flipped: treasure worth +1 to +8 or a squall worth -1 to -3. ' +
  'All players secretly pick one of their cards and reveal at the same time. Matching bids cancel each other out. ' +
  'Treasure goes to the highest bid nobody else matched; a squall is forced on the lowest unmatched bid. ' +
  'If every bid cancels, the prize stays on the table and stacks with the next one. Each card can be used once. ' +
  'After 11 rounds, the highest total wins.';
