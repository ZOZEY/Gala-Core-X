const fs = require('fs');
const stringSimilarity = require('string-similarity');

module.exports = {
    run (message, client, modules, settings) {
        let commandMsg = modules.valueHandler.commandFormat(message.content);
        let commands, command;

        try {
            commands = require('../commands.json');
        } catch (err) {
            modules.errorHandler.importError(err, '../commands.json')
        }

        function menu(message) {
            fs.readdir('./Commands', function(err, commands) {
                if (err) modules.errorHandler.readError(err, './Commands'); else commands.forEach(command => {
                    
                });
            });

            const filter = (reaction, user) => {
                return user.id === message.author.id;
            };
            
            message.awaitReactions(filter, { max: 1, time: 120000, errors: ['time'] }).then(collected => {
                const reaction = collected.first();
            
                listedCommands.forEach(item => {
                    if (reaction.emoji.name === item.emoji) {
                        const embed = new modules.discord.RichEmbed()
                            .setColor(0)
                            .setTitle(item.name)
                            .setDescription(`${item.description}\n**Alaises:** ` + item.alaises?item.alaises.join(' '):'none' + `\nWould you like to run this command?`)
                            .setAuthor(message.author.username, message.author.avatarURL)
                            .setTimestamp()
                            .setFooter('Gala Core X');

                        message.channel.send(embed);
                    }
                });
            });
        }

        function commandMenu(message, command) {
            const filter = (reaction, user) => {
                return user.id === message.author.id;
            };

            const embed = new modules.discord.RichEmbed()
                .setColor(0)
                .setTitle(item.name)
                .setDescription(`${item.description}\nAlaises: \`` + item.alaises?item.alaises.join(' '):'none' + `\`\n\nWould you like to run this command?`)
                .setAuthor(message.author.username, message.author.avatarURL)
                .setTimestamp()
                .setFooter('Gala Core X');

            pendingMessage = message.channel.send(embed);
            
            pendingMessage.awaitReactions(filter, { max: 1, time: 120000, errors: ['time'] }).then(collected => {
                const reaction = collected.first();
            
                if (reaction.emoji.name === item.emoji) {
                    
                }
            });
        }

        function wrongMenu(message, command) {
            const filter = (reaction, user) => {
                return ['✅', '❌'].includes(reaction.emoji.name)&&user.id === message.author.id;
            };

            const result = stringSimilarity.findBestMatch(command, commands.commands);
            const stringPart = (result.bestMatch.rating!=0)?`Are you looking for \`${commands.commands[result.bestMatchIndex]}\`?`:'There are no similar commands found.';

            const embed = new modules.discord.RichEmbed()
                .setColor(0)
                .setTitle('Help')
                .setDescription(`\`${command}\` command not found.\n\n` + stringPart)
                .setAuthor(message.author.username, message.author.avatarURL)
                .setTimestamp()
                .setFooter('Gala Core X');

            message.channel.send(embed).then((m)=>{
                m.react('❌').then(() => {  m.react('✅'); });

                m.awaitReactions(filter, { max: 1, time: 120000, errors: ['time'] }).then(collected => {
                    const reaction = collected.first();
                    
                    if (reaction.emoji.name === '✅') {
                        m.delete();
                    } else if (reaction.emoji.name === '❌') {
                        m.delete();

                        modules.messageHandler.send(message.channel, message.author, '✅').delete(4000);
                    }
                });
            });
        }

        if (commandMsg[1]) {
            if (commands.commands.includes(commandMsg[1])) {
                commandMenu(message, command);
            } else {
                wrongMenu(message, commandMsg[1]);
            }
        } else {
            menu(message);
        }
    },
    description: 'Get a list of commands and what they do.',
    emoji: '❓',
    categories: ['utility'],
    requiredPermissions: []
}