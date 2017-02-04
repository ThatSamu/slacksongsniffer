'use strict';

var SnifferBot = require('./lib/snifferbot.js');

var token = process.env.BOT_API_KEY;
var playlistID = process.env.PLAYLIST_ID;
var playlistOwner = process.env.PLAYLIST_OWNER;
var spotifyClientID = process.env.SPOTIFY_CLIENT_ID;
var spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
var spotifyRedirectURI = process.env.SPOTIFY_REDIRECT_URI;

var snifferbot = new SnifferBot({
    token: token,
    playlistID: playlistID,
    playlistOwner: playlistOwner,
    spotifyClientID: spotifyClientID,
    spotifyClientSecret: spotifyClientSecret,
    spotifyRedirectURI: spotifyRedirectURI
});

snifferbot.run();