class DbService {

	getUserState(userId) {
		//returns promisse
	}

	saveUserState(userState) {
		//dont return
	}

	updateCurrentCommand(userState, command) {
		userState.currentCommand = command;
		this.saveUserState(userState);
	}
	
}