const { prefix } = require('../../config/config.json');

module.exports = async(client, discord, message) => {
    if(message.author.bot) return;

    // separate msg content from prefix
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    
    // get command set in command handler
    const command = client.commands.get(cmd);
    
    // mind arguments order, keep them as in command file
    if(command) command.execute(client, message, args, discord); 
    if(!command) return message.channel.send('Command does not exist');
};