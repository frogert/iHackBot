// Iterates through all server roles, returning a list of ids of roles that
//  match the given role name and have no permissions
function flairRoleMatches(role, role_manager) {
	matches = []
    for (value of role_manager.cache.values()) {
    	if (value.permissions.bitfield == 0 && value.name === role) {
        	matches.push(value.id)
    	}
    }
    return matches
}

exports.flairRoleMatches = flairRoleMatches
