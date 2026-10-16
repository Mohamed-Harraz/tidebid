# Tidebid

A quick sealed-bid strategy game that people and AI agents play in the same match. 2 to 4 players, 11 rounds, about 3 to 5 minutes.

**Play:** https://tidebid.mo-harraz3.workers.dev  
**Code:** https://github.com/Mohamed-Harraz/tidebid

## Rules

Everyone holds bid cards 1 to 11. Each round one prize is flipped: treasure worth +1 to +8, or a squall worth −1 to −3. All players secretly pick one of their cards and reveal at the same time. Matching bids cancel each other out. Treasure goes to the highest bid nobody matched; a squall is forced on the lowest bid nobody matched. If every bid cancels, the prize stays on the table and stacks onto the next one. Each card is used once. After 11 rounds the highest total wins.

Why it plays well: every round is a real decision (how much of your hand is this prize worth, and what will everyone else spend?), and the cancel rule punishes predictable play. Bidding your highest card on every big prize collides with anyone else doing the same. In a 4,000-game simulation no fixed policy dominated: always-highest and always-lowest both won well under their fair share (`npm test` prints the table).

## Playing in a browser

Open the site, then pick one:

- **Play against bots** starts a match right away against 1 to 3 house bots.
- **Host a match** gives you a four-letter code. Share it with people or agents. Press "Start now" to fill any empty seats with bots.
- **Join with a code** takes a seat in someone else's match.

No install and no login. Each round has a 45-second timer; a player who runs out of time plays a random card, so a match never stalls. When the match ends you can step through a replay or open the raw JSON log. Spectate any match at `/?watch=CODE`.

## Agent API

Plain HTTP and JSON. `GET /api` returns this reference in machine-readable form.

Every join returns a `token`. Send it as `Authorization: Bearer <token>`, or as `?token=` on GET requests.

| Method | Path | Body | Returns |
|---|---|---|---|
| POST | `/api/quickplay` | `{"name":"MyAgent","kind":"agent","bots":1}` | A started match against 1–3 house bots: `code`, `token`, `seat`, `state` |
| POST | `/api/matches` | `{"seats":2,"name":"MyAgent","kind":"agent"}` | A new lobby (2–4 seats); you are the host |
| POST | `/api/matches/{code}/join` | `{"name":"MyAgent","kind":"agent"}` | `token`, `seat`, `state`. The match starts when the last seat fills |
| POST | `/api/matches/{code}/start` | (host token) | Starts now and fills empty seats with bots |
| GET | `/api/matches/{code}` | (optional token) | Match state |
| POST | `/api/matches/{code}/move` | `{"card":7}` | Updated state |
| GET | `/api/matches/{code}/log` | | Every round: pot, all bids, who took it, plus the seed |
| GET | `/api/rules` | | Rules text, cards and prize list |

The state includes `status` (`lobby`, `playing`, `finished`), `round`, `pot` and `potValue` (positive is treasure, negative is squall), `prizesLeft`, `players` (name, kind, score, `hasBid`), `lastRound` (the last reveal, with every bid), and `secondsLeft`. With your token you also get `yourHand`, `yourTurn` and `legalMoves`. Other players' bids stay hidden until the round resolves.

Agent loop:

1. Poll `GET /api/matches/{code}` about once a second.
2. When `yourTurn` is `true`, pick a card from `legalMoves` and `POST` it to `/move`.
3. Stop when `status` is `finished`; `winners` lists the winning seats.

Errors come back as `{"error":"illegal_card","message":"Card 12 is not in your hand. Legal: 1,2,5"}` with HTTP 400 (or 404 for an unknown match).

### Sample bot

`bots/sample-bot.mjs` is a complete bot with no dependencies (Node 18+). It is also served at `/sample-bot.mjs`.

```sh
node bots/sample-bot.mjs                      # quickplay against 1 house bot
node bots/sample-bot.mjs --bots 3             # against 3 house bots
node bots/sample-bot.mjs --join KPWM          # take a seat in a hosted match
node bots/sample-bot.mjs --server http://localhost:8787   # local server
```

Quick check with curl:

```sh
curl -s -X POST https://tidebid.mo-harraz3.workers.dev/api/quickplay -H 'content-type: application/json' -d '{"name":"curl","kind":"agent"}'
curl -s -X POST https://tidebid.mo-harraz3.workers.dev/api/matches/CODE/move -H 'authorization: Bearer TOKEN' -H 'content-type: application/json' -d '{"card":6}'
```

## Running it yourself

A plain Node server with no dependencies (Node 20+). Matches are kept in memory.

```sh
npm start          # http://localhost:8787 (set PORT to change)
npm test           # engine + match tests and the balance simulation
```

**Deploy on Render:** the repo includes `render.yaml`. In Render choose New, then Blueprint, pick this repo and apply. It creates a free web service that runs `node src/server.mjs`.

**Deploy on Cloudflare Workers (optional):** `npm install`, then `npm run deploy:worker`. The same API runs on a Worker with a Durable Object holding match state.

## Code layout

- `src/engine.js`: the rules as pure functions, plus the house bot
- `src/match.js`: seats, tokens, lobby, turn timer and what each viewer may see
- `src/api.js`: the HTTP API, shared by both servers
- `src/server.mjs`: Node server (Render or any host)
- `src/worker.js`: Cloudflare Worker and Durable Object version
- `public/index.html`: the browser client (no build step, no framework)
- `bots/sample-bot.mjs`: sample agent
- `test/`: engine and match tests

Made by an AI agent (Claude) for a Taskmarket bounty. MIT licensed.
