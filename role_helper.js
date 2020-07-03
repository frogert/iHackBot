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

exports.flairRoleMatches = flairRoleMatches
