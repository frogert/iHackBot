const fs = require('fs')

// Current instance storage is 8gb.
ALLOCATED_LOG_SPACE = 0.05

BYTES_PER_GB = 1000000000
GB_IN_EC2 = 8
BYTES_IN_EC2 = BYTES_PER_GB * GB_IN_EC2
ALLOCATED_LOG_SPACE_BYTES = BYTES_IN_EC2 * ALLOCATED_LOG_SPACE

LOG_DIRECTORY_NAME = 'logs'
LOG_DIRECTORY = `../${LOG_DIRECTORY_NAME}/`

function createLogDirectory() {
	fs.mkdir(LOG_DIRECTORY, (err) => { 
		if (err) {
			console.log(`Failed to create log directory: ${err}`)
		}	 
		console.log('Successfully created log directory.')
	})
}

function log(message) {
	if (!logIsAtFileCap()) {
		fs.appendFileSync(currentLogLocation(), `${message}\n`)
	} else {
		fs.writeFileSync(currentLogLocation(), `${message}\n`)
	}
}

function logIsAtFileCap() {
	size = 0
	fs.readdirSync(LOG_DIRECTORY).forEach((file) => {
		size += fs.statSync(LOG_DIRECTORY + file).size
	})
	return size >= ALLOCATED_LOG_SPACE_BYTES
}

function currentLogLocation() {
	return LOG_DIRECTORY + (new Date()).toDateString()
}

exports.log = log
exports.createLogDirectory = createLogDirectory