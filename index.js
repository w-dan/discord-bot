const discord = require("discord.js");
const { token } = require('./config/config.json');

// new client instance
const client = new discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES"],
});


client.commands = new discord.Collection();
client.events = new discord.Collection();

["commandHandler", "eventHandler"].forEach((file) => {
	require(`./handlers/${file}`)(client, discord);
});


client.login(token);
