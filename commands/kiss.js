module.exports = {
    run (message, client, modules) {
        const {get} = require("snekfetch");
        if (message.mentions.users.first())
        get('https://nekos.life/api/v2/img/kiss').then(response => message.channel.send(message.author + ' kissed ' + message.mentions.users.first(), {files: [JSON.parse(response.text.trim()).url]}));
      else
        message.channel.send('You must ping a user!');
    },
    description: 'HKiss',
    emoji: '🏓',
    categories: ['gif', 'fun'],
    requiredPermissions: []
}