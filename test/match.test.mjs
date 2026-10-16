import assert from 'node:assert/strict';
import { createMatch, joinMatch, startMatch, playMove, tick, view, TURN_SECONDS } from '../src/match.js';

let now = 1_000_000;
const { match: m, player: host } = createMatch({ code: 'TEST', seats: 3, name: 'Host', now });
const guest = joinMatch(m, { name: 'Guest', kind: 'agent' }, now);
assert.equal(m.status, 'lobby');
assert.throws(() => startMatch(m, guest.token, now), /creator/);
startMatch(m, host.token, now);
assert.equal(m.status, 'playing');
assert.equal(m.players[2].kind, 'bot');

// other players' bids stay hidden
playMove(m, host.token, 6, now);
const gv = view(m, guest.token, now);
assert.equal(gv.yourTurn, true);
assert.equal(JSON.stringify(gv).includes('"bids"'), false, 'pending bids must not leak');
assert.equal(gv.players[0].hasBid, true);

// timer: guest idles past the deadline, a random card is played for them
assert.equal(tick(m, now + 1000), false);
assert.equal(tick(m, now + TURN_SECONDS * 1000 + 1), true);
assert.equal(m.game.round, 2);
assert.equal(m.game.timeouts.length, 1);
console.log('match tests passed');
