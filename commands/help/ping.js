module.exports = {
    name: "ping",
    description: "Response time",
    
    async execute(client, message, args, discord) {
        message.channel.send('PONG');
    }
};