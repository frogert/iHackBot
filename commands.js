const Constants = require('./constants.json')
const RoleHelper = require('./role_helper.js')

// Executes a command based on a command word
function executeCommand(words, message) {
    command = words.shift()

    switch(command) {
        case 'help':
            doHelp(message)
            break
        case 'roles':
            doRoles(message)
            break
        case 'give':
            doGive(message)
            break
        case 'learn':
            doLearn(message)
            break
        case 'speak':
            doSpeak(message)
            break
        default:
            doDefault(message)
            break
    }
}

// TODO: move this to a memory file so it actually remembers stuff
new_word = 'hissssssss'

// Displays commands.
function doHelp(message) {
    message.reply(`HERE IS YOUR HELP \n\nMY COMMANDS ARE:\n\`\`\`\n-${Constants.commands.join('\n-')}\n\`\`\``)
}

// Displays confusion due to incorrect command.
function doDefault(message) {
    message.reply('*?????????*')
    message.reply('*do you need help?*')
}

// Displays server roles.
function doRoles(message) {
    roles = []
    message.guild.roles.cache.forEach(function(role) {
        roles.push(role.name)
    })
    roles.shift() // removes @everyone, cause it prints and tags @everyone otherwise :[

    message.reply(`*ROLES!*\n\n\`\`\`\n${roles.join('\n')}\n\`\`\``)
}

// Allows a user to give themself a role.
// TODO: This method should allow users to assign/unassign themselves to game roles
function doGive(message) {
    roleMatches = RoleHelper.flairRoleMatches(message.content.split(' ')[2], message.guild.roles)
    // Now give user all roles listed
}

// Stores a word for the bot to recite.
function doLearn(message) {
    new_word = message.content.split(' ')
    new_word.shift()
    new_word.shift()
    new_word = new_word.shift()

    message.reply('done!')
}

// Recites a stored word. Poorly.
function doSpeak(message) {
    if (new_word.length == 0) {
        message.reply('*??????*')
        return
    }

//for some reason new words cause this to just spam the word, instead of parts of the word...
    message.reply(
        `${new_word.slice(0,1)}...\
${new_word.slice(0,1)}...\
${new_word.slice(0,2)}...\
${new_word.toUpperCase()}!`)
}

// Exports the command switch for use in index.js
exports.executeCommand = executeCommand