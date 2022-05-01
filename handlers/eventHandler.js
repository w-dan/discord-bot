/************************************************/
/*               EVENT HANDLER                   /
/* checks events folder for javascript files     /
/* adds them to events collection                /
/************************************************/
const fs = require('fs');
const { CLIENT_RENEG_LIMIT } = require('tls');

module.exports = (client, discord) => {
    console.log('---------- <EVENTS> ----------');

    fs.readdirSync('./events/').forEach((dir) => {
        const events = fs
        .readdirSync(`./events/${dir}`)
        .filter((file) => file.endsWith('.js'));        // filter .js files
        
        // each command in directory
        for (const file of events) {
            try {
                let evnt = require(`../events/${dir}/${file}`);
            
                // on encountering event that doesn't match string type, handle separately
                if (evnt.event && typeof evnt.event !== 'string') {
                    console.log(`Error: ${file}`);
                    continue;
                }
                // log event name
                evnt.event = evnt.event || file.replace('.js', '');
                client.on(evnt.event, evnt.bind(null, client, discord));
                console.log(`Event loaded: ${file}`);
            } catch(error) {
                console.log('Error in event loading');
                console.log(error);
            }
        }
    });

    console.log('---------- </EVENTS> ----------');
};