/**
 * Copyright 2019 Jordan Owens
 * All rights reserved.
 */

const fs = require("fs");
let settings;
exports.start = function(e, s) {
    client = new s.discord.Client;
    try {
        client.login(e)
    } catch (e) {
        s.errorHandler.loginFailure(e)
    }
    s.logHandler.start(client), client.on("ready", () => {
        console.log("Bot started"), client.user.setActivity(` with ${client.guilds.memberCount} in ${client.guilds.size} servers.`)
    }), client.on("message", e => {
        try {
            settings = require("./settings.json")
        } catch (e) {
            throw "Could not import settings.json"
        }
        settings.defaultPrefixes.forEach(t => {
            if (e.content.toLowerCase().startsWith(t))
                if (commandMsg = e.content.replace(t, "").toLowerCase().split(" "), "" == commandMsg[0])
                    if (fs.existsSync(settings.commandDir + "/" + commandMsg[1] + ".js")) {
                        let t = require(settings.commandDir + "/" + commandMsg[1] + ".js");
                        e.content, t.run(e, client, s)
                    } else s.messageHandler.send(e.channel, e.author, 'Command "' + commandMsg[0] + '" not found. Please use `' + t + "help`.");
            else if (fs.existsSync(settings.commandDir + "/" + commandMsg[0] + ".js")) {
                let t = require(settings.commandDir + "/" + commandMsg[0] + ".js");
                try {
                    t.run(e, client, s)
                } catch (e) {
                    s.errorHandler
                }
            } else s.messageHandler.send(e.channel, e.author, 'Command "' + commandMsg[0] + '" not found. Please use `' + t + "help`.")
        })
    })
};