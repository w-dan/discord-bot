module.exports = {
    name: "ping",
    description: "Response time",
    
    async execute(message, args, client, discord) {
        message.channel.send('PONG');
    }
};