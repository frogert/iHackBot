// Iterates through all server roles, returning a list of ids of roles that
//  match the given role name and have no permissions
function flairRoleMatches(role_name, role_manager) {
	matches = []
    for (role of role_manager.cache.values()) {
    	if (role.permissions.bitfield == 0 && role.name == role_name) {
        	matches.push(role)
    	}
    }
    return matches
}

// Iterates through all server roles, adding them to lists of roles to be formatted
//  for front end display
function generateUserFriendlyRoleList(role_manager) {
	normal_title = '===*Roles*==='
    roles = []
    flair_title = '===*Flair Roles*==='
	flair_roles = []
	
    role_manager.cache.forEach(function(role) {
        if (role.permissions.bitfield == 0) {
            flair_roles.push('* ' + role.name)
        }
        else {
            roles.push('* ' + role.name)
        }
	})

	output_lines = [normal_title].concat(roles, [' '], flair_title, flair_roles)
	
	return `*ROLES!*\n\n\`\`\`\n${output_lines.join('\n')}\n\`\`\``
}

function doActionOnRole(message, role_name, action) {
	role_manager = message.guild.roles

    roleMatches = flairRoleMatches(role_name, role_manager)
    // Now give user all roles listed
    if (roleMatches.length == 0) {
        message.reply('No flair. Try *harder*!')
    }
    else {
        for (role of roleMatches) {
            action(role);
        }
        message.reply('DONE!')
    }
}

exports.flairRoleMatches = flairRoleMatches
exports.generateUserFriendlyRoleList = generateUserFriendlyRoleList
exports.doActionOnRole = doActionOnRole
