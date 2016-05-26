var db 			= require('./db_service'),
	constants	= require('./consts');
/*
	User action: instruction provided by the user on the form of a message
	Bot action: instruction to be performed by the bot
	State: (id) state of the user after the last action


	* Commands:
		- /go -> askUserLocation
			- /location -> listNearbyStops
				- [generic msg]

 */

function UserStateService() {
    return this;
};

UserStateService.prototype.getNextBotAction = function(msg) {
	var userid = msg.from.id;

	var currentState = db.getUserState(userid);
	return this.getUserActionForState(currentState, msg);
};


UserStateService.prototype.getUserActionForState = function(state, msg) {
	var userActionId = this.getUserActionId(msg);	
};

UserStateService.prototype.getUserActionId = function(msg) {
	if(msg.text && msg.text.indexOf('/go') === 0) {
        return constants.userAction.goCmd;
    }
    if(/^\/\d+$/) {
    	return constants.userAction.numberCmd;
    }
    if(msg.location) {
    	return constants.userAction.location;
    }
    if(msg.text && msg.text.charAt(0) !== '/') {
    	return constants.userAction.text;
    }
    return undefined;
};

module.exports = new UserStateService();
