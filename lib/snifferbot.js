'use strict';

var util = require('util');
var Bot = require('slackbots');
var SpotifyApi = require('spotify-web-api-node');

var SnifferBot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = 'songsniffer';

    this.user = null;
};

var spotifyApi = new SpotifyApi({
    clientId: this.settings.spotifyClientID,
    clientSecret: this.settings.spotifyClientSecret,
    redirectUri: this.settings.spotifyRedirectURI
});

// inherits methods and properties from the Bot constructor
util.inherits(SnifferBot, Bot);

SnifferBot.prototype.run = function () {
    SnifferBot.super_.call(this, this.settings);

    this.on('start', this._onStart);
    this.on('message', this._onMessage);
};

SnifferBot.prototype._onStart = function () {
    this._loadBotUser();
};

SnifferBot.prototype._welcomeMessage = function () {
    this.postMessageToChannel(this.channels[0].name, 'Goooood morning, Slackanam. I love the smell of songs in the morning!', {as_user: true});
};

SnifferBot.prototype._postPlaylistURL = function (message) {
    this.postMessageToChannel(this.channels[0].name, "<@" + message.user + '>, you can find the playlist at: ', {as_user: true});
};

SnifferBot.prototype._loadBotUser = function () {
    var self = this;
    this.user = this.users.filter(function (user) {
        return user.name === self.name;
    })[0];
};

SnifferBot.prototype._onMessage = function (message) {
    if (this._isChatMessage(message) &&
        this._isChannelConversation(message) &&
        !this._isFromBot(message))
    {

        if(this._hasSpotifyURL(message))
        {
            this._postToSpotifyList(message);
        }
        else if(this._asksForPlaylist(message))
        {
            this._postPlaylistURL(message);
        }
    }
    else if(message.type == 'channel_joined')
    {
        this._welcomeMessage();
    }
};

SnifferBot.prototype._isChatMessage = function (message) {
    return message.type === 'message' && Boolean(message.text);
};

SnifferBot.prototype._isChannelConversation = function (message) {
    return typeof message.channel === 'string' &&
        message.channel[0] === 'C';
};

SnifferBot.prototype._isFromBot = function (message) {
    return message.user === this.user.id;
};

SnifferBot.prototype._hasSpotifyURL = function (message) {
    return message.text.toLowerCase().indexOf('spotify.com/track') > -1;
};

SnifferBot.prototype._asksForPlaylist = function (message) {
    return message.text.toLowerCase().indexOf('playlist') > -1;
};

SnifferBot.prototype._postToSpotifyList = function (spotifyURL) {
    var spotifyTrackID = spotifyURL.text.split('/').slice(-1)[0].replace('>', '');
    spotifyApi.addTracksToPlaylist(this.settings.playlistOwner, this.settings.playlistID, ["spotify:track:" + spotifyTrackID])
        .then(function(data) {
            console.log('Added tracks to playlist!');
        }, function(err) {
            console.log('Something went wrong!', err);
    });
}
module.exports = SnifferBot;