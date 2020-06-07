# iHackBot
it does stuff

#### To test locally, execute following in project directory: <br>
* `npm rebuild` to set up node module dependencies <br>
* `npm run dev` to host the bot <br><br>
Note: You'll need to create your own token.json file with a bot token to test until we find a reason/need to store the actual bot token somewhere.

#### To add a command:
* Add a command word to `commands.js`
* Add the corresponding function as do{command} in `commands.js`
* Add the command word to the commands list in `constants.json`