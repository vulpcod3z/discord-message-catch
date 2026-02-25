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
        let user = (e.author.username) ? e.author.username : e.author.globalName;

        // Log message contents.
        fs.appendFile(`${process.env.LOG_FILE}`,
            `\nNEWLINE|${user}::${e.content}`,
            (err) => {
                (err) ? console.log('Error opening or writing to file..') : null;
            }
        );
    }
});

// Login.
bot.login(process.env.BOT_TOKEN);
