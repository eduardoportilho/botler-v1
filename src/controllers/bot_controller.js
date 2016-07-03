let TelegramBot 	= require('node-telegram-bot-api')
let firebaseService = require('../services/firebase_service');
let msgService 		= require('../services/message_service');
let UserState 		= require("../model/user_state");
let logger          = require('../logger');
let env 			= require('../env_config');
let actionClasses 	= {
	go: require('../actions/go_action')
};


class BotController {

	init() {
	    this.telegramToken = env.telegramToken;
	    //production: webhook
	    if(process.env.NODE_ENV === 'production' && !process.env.RUN_MODE === 'debug') {
		    this.host = env.host;
		    this.webhook = this.host + this.telegramToken;
	        this.bot = new TelegramBot(this.telegramToken);
	        this.bot.setWebHook(this.webhook);
	        logger.debug('Bot server started with webhook.');
	    }
	    //local: polling mode
	    else {
	        this.bot = new TelegramBot(
	        	this.telegramToken, { 
	        		polling: true
	        	});
	        this.bot.setWebHook("");
	        logger.debug('Bot server started on pooling mode.');
	    }
	    this.bot.on('message', msg => {
	    	this.onMessage(msg);
	    });
	}
	
	onMessage(msg) {
	    logger.debug(`Message received: ${JSON.stringify(msg)}`);
		let user = msg.from;
		let userState = firebaseService.getUserState(user.id) //user.id existe?
			.then(userState => {

	        	logger.debug(`user state: ${userState}`);
				if(userState === null) {
					userState = new UserState(user.id);
				}
				this.processUserMessage(msg, userState);
			})
			.catch(reason => {
	        	logger.debug(`error getting user state: ${reason}`);
			});
	}

	processUserMessage(msg, userState) {
		let ActionClass;
		//1. Is it a command?
		if(msgService.isCommand(msg)) {
			ActionClass = this.getActionForCommand(msg);
		}
		//2. User is executing a command?
		else if(userState.isCommandOpen()) {
			ActionClass = userState.getOpenCommandAction(); //o que esse
		}
		//3. I don't understand this...
		else {
	        this.replyToUser(msg, `Sorry ${msg.from.first_name} , I don't userstand ${msg.text} (yet)... :-(`)
		}
		let action = new ActionClass();
		action.run(msg, userState, this);
	}

	// repassa ao TelegramBot chamadas recebidas no webhook
	processUpdate(body) {
	    this.bot.processUpdate(body);
	}


	getActionForCommand(msg) {
		let cmd = msgService.parseCommand(msg);	
		switch(cmd.command) {
			case '/go':
				return actionClasses.go;
			default:
				throw new Error(`Unkown command: ${command}`);
		}
	}

	replyToUser(msg, text, buttons) {
    	let chatId = msg.chat.id;
		this.bot.sendMessage(chatId, text, {
				reply_markup: { 
					hide_keyboard: true 
				}
			});
	}
}

module.exports = new BotController();