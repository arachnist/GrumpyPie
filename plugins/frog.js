'use strict';

const request = require('request-promise');

module.exports = (bot, config) => {
    const frogTipsUrl = 'http://frog.tips/api/1/tips/';
    var tips = [];

    function getTip() {
        if (tips.length == 0) {
            request(frogTipsUrl)
                .then(function (body) {
                    tips = JSON.parse(body)["tips"];
                    return tips.pop()["tip"]
                })
                .catch(function (err) {
                    console.log("error: ", err)
                });
        } else {
            return tips.pop()["tip"];
        }
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
