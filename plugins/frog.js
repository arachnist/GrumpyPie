'use strict';

const request = require('request');

module.exports = (bot, config) => {
    const frogTipsUrl = 'http://frog.tips/api/1/tips/';
    var tips = [];

    function fetchNewTips() {
        return request(frogTipsUrl, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                tips = JSON.parse(body)["tips"];
            }
        });
    }

    function getTip() {
        if (tips.length == 0) {
            fetchNewTips();
        }

        return tips.pop()["tip"];
    }

    const frogTip = (channel) => {
        return bot.client.say(channel, getTip());
    }

    return {
        commands: {
            frog: [
                {
                    pattern: /^tip$/,
                    execute: (event) => frogTip(event.channel)
                },
                "Usage: frog"
            ]
        }
    };
};
