const Constants = require('./constants.json')
const RoleHelper = require('./role_helper.js')
const fs = require('fs')

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
        case 'ungive':
            doUngive(message)
            break
        case 'learn':
            doLearn(message)
            break
        case 'speak':
            doSpeak(message)
            break
        case 'register':
            doRegister(message)
            break
        case 'display':
            doDisplay(message)
            break
        default:
            doDefault(message)
            break
    }
}

// TODO: move this to a memory file so it actually remembers stuff
new_word = 'hissssssss'
registry = {}

// Displays commands.
function doHelp(message) {
    message.reply(`HERE IS YOUR HELP \n\nMY COMMANDS ARE:\n\`\`\`\n-${Constants.commands.join('\n-')}\n\`\`\``)
}

// Displays confusion due to incorrect command.
function doDefault(message) {
    message.channel.send('*?????????*')
    message.channel.send('*do you need help?*')
}

// Displays server roles.
function doRoles(message) {
    role_manager = message.guild.roles

    message.reply(RoleHelper.generateUserFriendlyRoleList(role_manager))
}

// Allows a user to give themself a role.
function doGive(message) {
    role_name = message.content.split(' ').slice(2).join(' ')
    role_manager = message.guild.roles

    roleMatches = RoleHelper.flairRoleMatches(role_name, role_manager)
    // Now give user all roles listed
    if (roleMatches.length == 0) {
        message.reply('No flair. Try *harder*!')
    }
    else {
        for (role of roleMatches) {
            message.member.roles.add(role);
        }
        message.reply('DONE!')
    }
}

// Allows a user to remove a role.
function doUngive(message) {
    role_name = message.content.split(' ').slice(2).join(' ')
    // RoleHelper.doActionOnRole(message, role_name, message.member.roles.remove)

    role_manager = message.guild.roles

    roleMatches = RoleHelper.flairRoleMatches(role_name, role_manager)
    // Now give user all roles listed
    if (roleMatches.length == 0) {
        message.reply('No flair. Try *harder*!')
    }
    else {
        for (role of roleMatches) {
            message.member.roles.remove(role);
        }
        message.reply('DONE!')
    }
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

// Stores a mapping of user to steam name
function doRegister(message) {
    steam_id = message.content.split(' ')
    steam_id.shift()
    steam_id.shift()
    updateRegistry(steam_id, message.author.id)
    message.reply(`Registered as ${steam_id}!`)
    console.log(message)
}

function notifyUser(message) {
    loadRegistry()
    console.log(`Notifying users on message ${message.content}`)
    to_send = []
    for (word of message.content.split(' ')) {
        if (registry[processWord(word)]) { to_send.push(`<@${registry[processWord(word)]}>`) }
    }
    if (to_send.length) { message.channel.send(to_send.join(' ')) }
}

function processWord(word) {
    return word.slice(1)
}

function loadRegistry() {
    try {
        raw = fs.readFileSync('../registry.json')
        registry = JSON.parse(raw)
    } catch (err) {
        console.log(`ERROR LOADING REGISTRY: ${err}`)
    }
}

// this function needs to support tracking different servers
function updateRegistry(key, value) {
    registry[key] = value
    fs.writeFileSync('../registry.json', JSON.stringify(registry))
}

function doDisplay(message) {
    loadRegistry()
    message.channel.send(`Registry!:\n\n${JSON.stringify(registry)}`)
}

// Exports the command switch for use in index.js
exports.executeCommand = executeCommand
exports.notifyUser = notifyUser