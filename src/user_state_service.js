var db 		= require('./db_service'),
	constants 	= require('./consts');
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

UserStateService.prototype.getNextBotActionAndUpdateState = function(msg) {
	var userid = msg.from.id;
	var currentState = db.getUserState(userid);
	var userActionId = this.getUserActionId(msg);
	var nextBotAction = constants.botAction.msgDidntUnderstand;

	if (currentState === constants.userState.none) {
		if (userActionId === constants.userAction.goCmd) {
			nextBotAction = constants.botAction.askLocation;
		}
	} 
	else if (currentState === constants.userState.goCollectLocation) {
		if (userActionId === constants.userAction.location) {
			nextBotAction = constants.botAction.listStops;
		}
	}
	else if (currentState === constants.userState.goCollectStop) {
		if (userActionId === constants.userAction.numberCmd) {
			nextBotAction = constants.botAction.listDepartures;
		}
		else if (userActionId === constants.userAction.text) {
			nextBotAction = constants.botAction.listStops;
		}
	}
	var nextUserState = this.getNextUserState(currentState, userActionId);
	db.setUserState(userid, nextUserState);

	return nextBotAction;
};

UserStateService.prototype.getUserActionId = function(msg) {
	if (msg.text && msg.text.indexOf('/go') === 0) {
        return constants.userAction.goCmd;
    }
    if (/^\/[0-9]+$/.test(msg.text)) {
    	return constants.userAction.numberCmd;
    }
    if (msg.location) {
    	return constants.userAction.location;
    }
    if (msg.text && msg.text.charAt(0) !== '/') {
    	return constants.userAction.text;
    }
    return undefined;
};


UserStateService.prototype.getNextUserState = function(currentState, nextUserAction) {
	if (currentState === constants.userState.none) {
		if (nextUserAction === constants.userAction.goCmd) {
			return constants.userState.goCollectLocation;
		}
	}
	if (currentState === constants.userState.goCollectLocation) {
		if (nextUserAction === constants.userAction.location) {
			return constants.userState.goCollectStop;
		}
	}
	if (currentState === constants.userState.goCollectStop) {
		if (nextUserAction === constants.userAction.numberCmd) {
			return constants.userState.none;
		}
		if (nextUserAction === constants.userAction.text) {
			return constants.userState.goCollectStop;
		}
	}
	return currentState;
};

module.exports = new UserStateService();
