'use strict';

var SnifferBot = require('./lib/snifferbot.js');

var token = process.env.BOT_API_KEY;
var name = process.env.BOT_NAME;

var snifferbot = new SnifferBot({
    token: token,
    name: name
});

snifferbot.run();