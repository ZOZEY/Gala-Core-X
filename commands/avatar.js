module.exports = {
    run (message, client, modules, settings) {
        if (message.mentions.users.first()) {
            message.channel.send(message.mentions.users.first().avatarURL); 
        } else {
            message.channel.send('You must ping a user!');
        }
    },
    description: 'View somebody\'s profile picture.',
    emoji: '😀',
    categories: ['utility'],
    requiredPermissions: []
}