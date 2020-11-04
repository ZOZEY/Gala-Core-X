module.exports = {
    run (message, client, modules) {
        const {get} = require("snekfetch");
        if (message.mentions.users.first())
        get('https://nekos.life/api/v2/img/tickle').then(response => message.channel.send(message.author + ' is tickling ' + message.mentions.users.first(), {files: [JSON.parse(response.text.trim()).url]}));
      else
        message.channel.send('You must ping a user!');
    },
    description: 'Tickle',
    emoji: '🏓',
    categories: ['gif', 'fun'],
    requiredPermissions: []
}