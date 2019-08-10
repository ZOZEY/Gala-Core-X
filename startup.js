const fs = require("fs"),
readline = require("readline"),
requiredModules = ["messageHandler.js", "valueHandler.js", "logHandler.js"];
let settings, data, commands, modules = {};
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});
try {
modules.discord = require("discord.js")
} catch (e) {
throw "Could not import discord.js"
}
console.log("discord.js imported");
try {
require("crypto")
} catch (e) {
throw "Could not import crypto"
}
if (console.log("crypto imported"), fs.existsSync("./settings.json")) {
try {
    settings = require("./settings.json")
} catch (e) {
    throw "Could not import settings.json"
}
console.log("settings.json imported"), moduleDirCheck()
} else {
function settingsCheck() {
    rl.question("You're settings.json file is missing, would you like to create one now? (y/n)\n>", e => {
        if ("y" == e) rl.question("Please type the directory for gala's modules.\n>", e => {
            if (!fs.existsSync(e)) throw "Module directory not found";
            rl.question("Please type the directory for gala's commands.\n>", o => {
                if (!fs.existsSync(e)) throw "Command directory not found"; {
                    let s = '{"moduleDir": "' + e + '", "commandDir": "' + o + '"}';
                    fs.writeFile("settings.json", s, e => {
                        if (e) throw "Could not create settings.json file";
                        console.log("settings file created");
                        try {
                            settings = require("./settings.json")
                        } catch (e) {
                            throw "Could not import settings.json"
                        }
                        console.log("settings.json imported"), moduleDirCheck()
                    })
                }
            })
        });
        else if ("n" == e) {
            if (!fs.existsSync("./settings.json")) throw "Could not proceed with startup due to missing settings file"
        } else settingsCheck()
    })
}
settingsCheck()
}

function moduleDirCheck() {
if (!fs.existsSync(settings.moduleDir)) throw "Module directory not found";
console.log("Module directory found"), commandDirCheck()
}

function commandDirCheck() {
if (!fs.existsSync(settings.commandDir)) throw "Command directory not found";
console.log("Command directory found"), requiredModuleCheck()
}

function requiredModuleCheck() {
if (!fs.existsSync(settings.moduleDir + "/errorHandler.js")) throw "Could not proceed with startup due to missing errorHandler module";
try {
    modules.errorHandler = require(settings.moduleDir + "/errorHandler.js")
} catch (e) {
    throw "Could not import errorHandler.js"
}
if (fs.existsSync(settings.moduleDir + "/encryption.js")) {
    try {
        modules.encryption = require(settings.moduleDir + "/encryption.js")
    } catch (e) {
        modules.errorHandler.importFailure(e, "encryption.js")
    }
    jsonCheck()
} else modules.errorHandler.missingModule("encryption.js")
}

function jsonCheck() {
if (fs.existsSync("./data.json")) {
    try {
        data = require("./data.json")
    } catch (e) {
        modules.errorHandler.importFailure(e, "./data.json")
    }
    if (console.log("data.json imported"), fs.existsSync("./commands.json")) {
        try {
            commands = require("./commands.json")
        } catch (e) {
            modules.errorHandler.importFailure(e, "./commands.json")
        }
        console.log("commands.json imported"), finalModuleCheck()
    } else rl.question("You're commands.json file is missing, would you like to create one now? (y/n)\n>", e => {
        "y" == e ? fs.writeFile("commands.json", "{}", e => {
            if (e) modules.errorHandler.writeError(e, "./commands.json");
            else {
                console.log("commands.json created");
                try {
                    commands = require("./commands.json")
                } catch (e) {
                    modules.errorHandler.importFailure(e, "./commands.json")
                }
                console.log("commands.json imported"), moduleDirCheck()
            }
        }) : "n" == e && (fs.existsSync("./data.json") ? dataCheck() : modules.errorHandler.missingModule("commands.json"))
    })
} else rl.question("You're data.json file is missing, would you like to create one now? (y/n)\n>", e => {
    "y" == e ? fs.writeFile("data.json", "{}", e => {
        if (e) modules.errorHandler.writeError(e, "./data.json");
        else {
            console.log("data.json created");
            try {
                data = require("./data.json")
            } catch (e) {
                modules.errorHandler.importFailure(e, "./data.json")
            }
            console.log("settings.json imported"), moduleDirCheck()
        }
    }) : "n" == e && (fs.existsSync("./data.json") ? dataCheck() : modules.errorHandler.missingModule("data.json"))
})
}

function finalModuleCheck() {
requiredModules.forEach(function(e) {
    if (fs.existsSync(settings.moduleDir + "/" + e)) try {
        modules[e.replace(".js", "")] = require(settings.moduleDir + "/" + e), modules[e.replace(".js", "")].initialize(modules), console.log(e + " imported")
    } catch (o) {
        modules.errorHandler.importFailure(o, settings.moduleDir + "/" + e)
    } else modules.errorHandler.missingModule(settings.moduleDir + "/" + e)
}), checkSettings()
}

function checkSettings() {
settings.token ? settings.defaultPrefixes ? commandCheck() : rl.question("Please type the bot's default prefix.\n>", e => {
    settings.defaultPrefixes = [e.toLowerCase()], fs.writeFile("./settings.json", JSON.stringify(settings), e => {
        e ? modules.errorHandler.writeError(settings) : (console.log("Prefix set"), checkSettings())
    })
}) : rl.question("Enter the bot's token.\n>", e => {
    rl.question("Enter an encryption password you will remember.\n>", o => {
        settings.token = modules.encryption.encrypt(e, o), fs.writeFile("./settings.json", JSON.stringify(settings), e => {
            e ? modules.errorHandler.writeError(e, settings) : (console.log("Token set"), checkSettings())
        })
    })
})
}

function commandCheck() {
commands.commands = [], fs.readdirSync(settings.commandDir).forEach(e => {
    let o = e;
    try {
        e = require(`${settings.commandDir}/${e}`)
    } catch (o) {
        modules.errorHandler.importFailure(o, e)
    }
    e.run && e.description && e.emoji && e.categories && e.requiredPermissions && modules.valueHandler.isEmoji(e.emoji) && 2 == e.emoji.length && e.categories.every(e => commands.categories.hasOwnProperty(e)) ? (commands.commands.push(o.replace(".js", "")), console.log(`${o.replace(".js","")} command functional`)) : console.log(`${o.replace(".js","")} has an issue and will not be added to command list`)
}), fs.writeFile("./commands.json", JSON.stringify(commands), e => {
    e && modules.errorHandler.writeError(e, file)
}), botStart()
}

function botStart() {
if (fs.existsSync("./core.js")) {
    try {
        core = require("./core.js")
    } catch {
        modules.errorHandler.importFailure("core.js")
    }
    rl.question("Enter encryption password\n>", e => {
        core.start(modules.encryption.decrypt(settings.token, e), modules, commands)
    })
} else modules.errorHandler.missingModule("core.js")
}