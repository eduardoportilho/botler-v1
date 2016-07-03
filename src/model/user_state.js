class UserState {

	constructor(id) {
		this.id = id;
		this.savedStations = [];
	}

	hasSavedStations() {
		return this.savedStations.length > 0;
	}
	
	getSavedStations() {
		return this.savedStations
	}

	isCommandOpen() {
		//TODO
	}

	getCurrentCommand() {
		//TODO: something like 'GoAction:getSelectedStation'
	}

	getOpenCommandAction() {
		//TODO something like 'GoAction' ???
	}

	setCurrentCommand(command) {

	}

	static fromObject(object) {
		let userState = new UserState(object['id']);
		userState.savedStations = object['savedStations'] || [];

		return userState;
	}
}


module.exports = UserState;