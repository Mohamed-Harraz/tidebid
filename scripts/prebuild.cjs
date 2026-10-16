// Copies the sample bot into the Worker bundle so it can be served at /sample-bot.mjs.
const fs = require('fs');
fs.mkdirSync('src/generated', { recursive: true });
fs.copyFileSync('bots/sample-bot.mjs', 'src/generated/sample-bot.txt');
