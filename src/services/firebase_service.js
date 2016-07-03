let env 	 = require('../env_config');
let firebase = require("firebase");
let UserState = require("../model/user_state");

class FirebaseService {

	constructor() {
		firebase.initializeApp(env.firebase);
	}

	getUserState(userId) {
		return firebase
			.database()
			.ref('/userstate/' + userId)
			.once('value')
			.then((snapshot) => {
				let data = snapshot.val();
				if(data) {
					return UserState.fromObject(data);
				}
				return null;
			});
	}

	saveUserState(userState) {
		let userId = userState.id;
		firebase
			.database()
			.ref('userstate/' + userId)
			.set(userState);
		//dont return
	}

	updateCurrentCommand(userState, command) {
		userState.setCurrentCommand(command);
		this.saveUserState(userState);
	}	
}

module.exports = new FirebaseService();