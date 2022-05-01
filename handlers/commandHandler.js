const fs = require('fs');

module.exports = (client, discord) => {
    // iterate through commands in each directory, then require every command in each folder
    console.log('---------- <COMMANDS> ----------');
    fs.readdirSync('./commands').forEach((dir) => {
        const commands = fs
        .readdirSync(`./commands/${dir}`)
        .filter((file) => file.endsWith(".js"));        // array with all .js files
        
        // each command in directory
        for(const file of commands) {
            const cmd = require(`../commands/${dir}/${file}`);
            // check if file in route actualy exists, console log loaded commands (easier to check)
            if(cmd.name) {
                console.log(cmd.name);
                client.commands.set(cmd.name, cmd);
            } else {    // check errors
                console.log(`Error: ${cmd.name}`);
            }
        }
    });
    console.log('---------- </COMMANDS> ----------');
};