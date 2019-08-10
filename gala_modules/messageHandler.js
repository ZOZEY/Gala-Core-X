/**
 * Copyright 2019 Galaktikos
 * All rights reserved.
 */

let modules;
module.exports = {
    initialize(e) {
        modules = e
    },
    send(e, s, t) {
        const o = (new modules.discord.RichEmbed).setColor(0).setTitle(t).setAuthor(s.username, s.avatarURL).setTimestamp().setFooter("Gala Core X");
        return e.send(o)
    }
};