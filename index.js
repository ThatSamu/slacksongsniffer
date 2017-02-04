'use strict';

var SnifferBot = require('./lib/snifferbot.js');

var token = process.env.BOT_API_KEY;
var playlistID = process.env.PLAYLIST_ID;
var playlistOwner = process.env.PLAYLIST_OWNER;

var snifferbot = new SnifferBot({
    token: token,
    playlistID: playlistID,
    playlistOwner: playlistOwner
});

snifferbot.run();