/************************************************/
/*               COMMAND HANDLER                 /
/* checks commands folder for javascript files   /
/* adds them to commands collection              /
/************************************************/

const fs = require('fs');

module.exports = (client, discord) => {
    // iterate through commands in each directory, then require every command in each folder
    console.log('---------- <COMMANDS> ----------');
    fs.readdirSync("./commands/").forEach((dir) => {
        const commands = fs
          .readdirSync(`./commands/${dir}`)
          .filter((file) => file.endsWith('.js'));        // filter .js files
        
        // check every route in directory
        for (const file of commands) {
            const cmd = require(`../commands/${dir}/${file}`);
            // check if file in route actualy exists, console log loaded commands (easier to check)
            if (cmd.name) {
                console.log(cmd.name);
                client.commands.set(cmd.name, cmd);
            } else {
                console.log(`Error: ${file}`);
            }
          }
        });
    console.log('---------- </COMMANDS> ----------');
};
