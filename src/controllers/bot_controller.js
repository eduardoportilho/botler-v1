let dbService = require(...);
let BotWrapper = require('../model/bot_wrapper');


class BotController {

	constructor() {
		this.bot = new BotWrapper(/* passar o bot telegram aqui*/);
	}
	
	onMessage(msg) {
		let user = msg.from;
		let userState = dbService.getUserState(user.id) //user.id existe?
			.then(userState => {
				processUserMessage(msg, userState);
			});
	}

	processUserMessage(msg, userState) {
		let ActionClass;
		//1. Is it a command?
		if(botService.isCommand(msg)) {
			ActionClass = getActionForCommand(msg);
		}
		//2. User is executing a command?
		else if(userState.isCommandOpen()) {
			ActionClass = userState.getOpenCommandAction(); //o que esse
		}
		//3. I don't understand this...
		else {
			throw new Error(`I don't understand ${msg.text}`);
		}
		let action = new ActionClass();
		action.run(msg, userState, this.bot);
	}


	getActionForCommand(msg) {
		let command = msg.text.split(' ')[0];	
		switch(command) {
			case '/go':
				return GoAction;
			default:
				throw new Error(`Unkown command: ${command}`);
		}
	}
}

module.exports.BotController;