// Imports

const Discord = require('discord.js')

const token = require('./token.json')
const Commands = require('./commands.js')


// Client initialization

const client = new Discord.Client()
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})


// Message handling

client.on('message', msg => {
    words = tokenizeMessage(msg)

    if (isCalledByName(words.shift())) {
        Commands.executeCommand(words, msg)
    }
})


// Text Processing

function tokenizeMessage(message) {
    return message.content.split(' ')
}

function isCalledByName(word) {
    return ['scratch', 'klefstad', 'churchki'].includes(word.toLowerCase())
}


client.login(token.token)
