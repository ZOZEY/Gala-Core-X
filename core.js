/**
 * Copyright 2019 Galaktikos
 * All rights reserved.
 */

const fs = require("fs");
let settings;
exports.start = function(e, n, s) {
    client = new n.discord.Client;
    try {
        client.login(e)
    } catch (e) {
        n.errorHandler.loginFailure(e)
    }
    n.logHandler.start(client), client.on("ready", () => {
        console.log("Bot started"), client.user.setActivity(` with ${client.guilds.memberCount} in ${client.guilds.size} servers.`)
    }), client.on("message", e => {
        try {
            settings = require("./settings.json")
        } catch (e) {
            throw "Could not import settings.json"
        }
        settings.defaultPrefixes.forEach(t => {
            if (e.content.toLowerCase().startsWith(t))
                if (commandMsg = e.content.toLowerCase().replace(t, "").split(" "), "" == commandMsg[0])
                    if (s.commands.includes(commandMsg[1])) try {
                        let s = require(`${settings.commandDir}/${commandMsg[1]}.js`);
                        try {
                            s.run(e, client, n)
                        } catch (e) {
                            n.errorHandler.runError(e, `${settings.commandDir}/${commandMsg[1]}.js`)
                        }
                    } catch (e) {
                        n.errorHandler.importFailure(e, `${settings.commandDir}/${commandMsg[1]}.js`)
                    } else n.messageHandler.send(e.channel, e.author, `Command \`${commandMsg[1]}\` not found. Please use \`${t} help\`.`);
                    else if (s.commands.includes(commandMsg[0])) try {
                let s = require(`${settings.commandDir}/${commandMsg[0]}.js`);
                try {
                    s.run(e, client, n)
                } catch (e) {
                    n.errorHandler.runError(e, `${settings.commandDir}/${commandMsg[0]}.js`)
                }
            } catch (e) {
                n.errorHandler.importFailure(e, `${settings.commandDir}/${commandMsg[0]}.js`)
            } else n.messageHandler.send(e.channel, e.author, `Command \`${commandMsg[0]}\` not found. Please use \`${t}help\`.`)
        })
    })
};