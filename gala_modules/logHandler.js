/**
 * Copyright 2019 Galaktikos
 * All rights reserved.
 */

const logTypes = ["channelCreate", "channelDelete", "channelPinsUpdate", "channelUpdate", "clientUserGuildSettingsUpdate", "clientUserSettingsUpdate", "debug", "disconnect", "emojiCreate", "emojiDelete", "emojiUpdate", "error", "guildBanAdd", "guildBanRemove", "guildCreate", "guildDelete", "guildIntegrationsUpdate", "guildMemberAdd", "guildMemberAvailable", "guildMemberRemove", "guildMembersChunk", "guildMemberSpeaking", "guildMemberUpdate", "guildUnavailable", "guildUpdate", "message", "messageDelete", "messageDeleteBulk", "messageReactionAdd", "messageReactionRemove", "messageReactionRemoveAll", "messageUpdate", "presenceUpdate", "rateLimit", "ready", "reconnecting", "resume", "roleCreate", "roleDelete", "roleUpdate", "typingStart", "typingStop", "userNoteUpdate", "userUpdate", "voiceStateUpdate", "warn", "webhookUpdate"],
    fs = require("fs"),
    CircularJSON = require("circular-json");
let modules, logs = [];
module.exports = {
    initialize(e) {
        modules = e
    },
    start(e) {
        fs.readFile("gala_logs.json", (e, a) => {
            e ? modules.errorHandler.readError("gala_logs.json") : logs = JSON.parse(a)
        }), logTypes.forEach(a => {
            e.on(a, e => {
                let l = a;
                logs.push({
                    type: l,
                    time: Date.now(),
                    info: e
                })
            })
        }), setInterval(() => {
            fs.writeFile("gala_logs.json", CircularJSON.stringify(logs), e => {
                e && modules.errorHandler.writeError("gala_logs.json")
            })
        }, 5e3)
    }
};