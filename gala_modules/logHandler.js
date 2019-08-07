/**
 * Copyright 2019 Jordan Owens
 * All rights reserved.
 */

const logTypes = ["channelCreate", "channelDelete", "channelPinsUpdate", "channelUpdate", "clientUserGuildSettingsUpdate", "clientUserSettingsUpdate", "debug", "disconnect", "emojiCreate", "emojiDelete", "emojiUpdate", "error", "guildBanAdd", "guildBanRemove", "guildCreate", "guildDelete", "guildIntegrationsUpdate", "guildMemberAdd", "guildMemberAvailable", "guildMemberRemove", "guildMembersChunk", "guildMemberSpeaking", "guildMemberUpdate", "guildUnavailable", "guildUpdate", "message", "messageDelete", "messageDeleteBulk", "messageReactionAdd", "messageReactionRemove", "messageReactionRemoveAll", "messageUpdate", "presenceUpdate", "rateLimit", "ready", "reconnecting", "resume", "roleCreate", "roleDelete", "roleUpdate", "typingStart", "typingStop", "userNoteUpdate", "userUpdate", "voiceStateUpdate", "warn", "webhookUpdate"];
let modules, logs = [];
module.exports = {
    initialize(e) {
        modules = e
    },
    start(e) {
        logTypes.forEach(l => {
            e.on(l, e => {
                let a = l;
                logs.push({
                    type: a,
                    time: Date.now(),
                    info: e
                })
            })
        }), setInterval(() => {
            logFile = modules.fileHandler.read("gala_logs.json"), logFile ? modules.fileHandler.write("gala_logs.json", logFile.push(logs)) : modules.fileHandler.write("gala_logs.json", logs)
        }, 5e3)
    }
};