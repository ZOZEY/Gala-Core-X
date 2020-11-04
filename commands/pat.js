module.exports = {
    run (message, client, modules) {
        const {get} = require("snekfetch");
        if (message.mentions.users.first())
        get('https://nekos.life/api/v2/img/pat').then(response => message.channel.send(message.author + ' just gave you a pat ' + message.mentions.users.first() + ' for being good 🙂', {files: [JSON.parse(response.text.trim()).url]}));
      else
        message.channel.send('You must ping a user!');
    },
    description: 'Pat',
    emoji: '🏓',
    categories: ['gif', 'fun'],
    requiredPermissions: []
}