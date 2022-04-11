// necessary Discord.js classes
const fs = require('node:fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('../config/config.json');

// new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// gathering commands (files ending in .js) into a collection
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // adding new item to the collection
    // with key = command name and value = exported module
    // (node's collection extends from javascript's native map class)
    client.commands.set(command.data.name, command);
}

// run on client ready (only once)
client.once('ready', () => {
    console.log('Ready!');
});


client.on('interactionCreate', async interaction => {
    if (interaction.isCommand())
        return;
    
    // fetch the command in the collection with that name and assign it to the variable. 
    // if the command doesn't exist, it will return undefined, so exit early with return
    const command = client.commands.get(interaction.commandName);

    if (!command) 
        return;

    // if it does exist, call the command's execute method with the interaction as argument
    try {
        await command.execute(interaction);
    } catch (error) {                           // log error and report if anything goes wrong
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command', ephemeral: true });
    }
});


// login to Discord with client's token
client.login(token);
