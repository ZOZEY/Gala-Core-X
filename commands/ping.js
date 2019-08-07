module.exports = {
    async run (message, client, modules) {
        const msg = await modules.messageHandler.send(message.channel, message.author, 'Ping!');
        msg.delete();
        modules.messageHandler.send(message.channel, message.author, `🏓 Pong! at ${msg.createdTimestamp - message.createdTimestamp}ms latency. API Latency is ${Math.round(client.ping)}ms 🏓`);
    },
    description: 'Pong!',
    emoji: '🏓',
    categories: ['fun', 'utility'],
    requiredPermissions: []
}