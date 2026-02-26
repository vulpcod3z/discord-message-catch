## Requirements
- Node.js (*tested with 24.11.1*)
- NPM (*tested with 11.6.2*)
- Discord server permissions: ***Send messages*** and ***Read message history***

## Installation
1. Install Node.js w/NPM
2. Clone repo
3. Run `npm i` to install dependencies
4. Create `.env` file with following info:
   - `BOT_TOKEN` - Discord token id for bot
   - `WATCH_CH` - Discord channel id of channel to watch
   - `LOG_FILE` - name/path of file for logging

## Running
You can setup an NPM runner using the `package.json` file or launch from the terminal with `node index` *(note: working directory must be root of repo)*
