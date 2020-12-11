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
	try {
	    words = tokenizeMessage(msg)

	    if (isCalledByName(words.shift())) {
	        Commands.executeCommand(words, msg)
	    }
	    if (isCivNotification(msg)) {
	    	Commands.notifyUser(msg)
	    }
    } catch (err) {
    	console.log(msg)
    	console.log(`ERROR PROCESSING MESSAGE: ${err}`)
    }
})


// Text Processing

function tokenizeMessage(message) {
    return message.content.split(' ')
}

function isCalledByName(word) {
    return ['scratch', 'klefstad', 'churchki'].includes(word.toLowerCase())
}

function isCivNotification(message) {
	return message.author.username === "Civ Hook"
}

client.login(token.token)
