const fs = require('node:fs');
const path = require('node:path');
const { loadEnvFile } = require('node:process');
const { Client, Events, GatewayIntentBits, MessageFlags } = require('discord.js');

// Load env file.
loadEnvFile();

// Create client.
const discord = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

// Create bot instance.
const bot = discord.once(Events.ClientReady, (instance) => {
    return instance;
});

// Get Guild.
let _guild = null;

// Load file or create if non-existent.
fs.writeFile(`${process.env.LOG_FILE}`, 'Bot started!', (err) => {
    if (err) {
        console.log('Error opening and initializing file..');
    }
});

// EVENT::On_MessageCreate
bot.on(Events.MessageCreate, async (e) => {
    
    // If message from expected channel..
    if (e.channelId == process.env.WATCH_CH) {

        // Use guild username or Discord globalName if not available.
        let user = (e.member.nickname) ? e.member.nickname : e.author.username;

        // Check for user mention and handle appropriately.
        if (e.content.includes('<@&')) {
            let start_role_mention = e.content.indexOf('<@&');
            let end_role_mention = e.content.indexOf('>');
            let mentioned_role_tag = e.content.slice(start_role_mention, end_role_mention + 1);
            let mentioned_role_id = e.content.slice(start_role_mention + 3, end_role_mention);
            let mentioned_role = await _guild.roles.fetch(mentioned_role_id);

            fs.appendFile(`${process.env.LOG_FILE}`,
                `\nNEWLINE|${user}::${e.content.replace(mentioned_role_tag, `@${mentioned_role.name}`)}`,
                (err) => {
                    (err) ? console.log('Error opening or writing to file..') : null;
                }
            );
        }

        // Check for user mention and handle appropriately.
        else if (e.content.includes('<@')) {
            let start_mention = e.content.indexOf('<@');
            let end_mention = e.content.indexOf('>');
            let mentioned_tag = e.content.slice(start_mention, end_mention + 1);
            let mentioned_id = e.content.slice(start_mention + 2, end_mention);
            let mentioned = await _guild.members.fetch(mentioned_id);

            fs.appendFile(`${process.env.LOG_FILE}`,
                `\nNEWLINE|${user}::${e.content.replace(mentioned_tag, (mentioned.nickname) ? `@${mentioned.nickname}` : `@${mentioned.user.username}`)}`,
                (err) => {
                    (err) ? console.log('Error opening or writing to file..') : null;
                }
            );
        }

        // Handle message as normal.
        else {
            fs.appendFile(`${process.env.LOG_FILE}`,
                `\nNEWLINE|${user}::${e.content}`,
                (err) => {
                    (err) ? console.log('Error opening or writing to file..') : null;
                }
            );
        }
    }
});

// Login.
bot.login(process.env.BOT_TOKEN);
(async () => {
    _guild = await bot.guilds.fetch('549349052580364329');
}) ();
