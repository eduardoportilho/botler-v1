class BotWrapper {

	constructor(bot) {
		this.bot = bot;
	}

	getMsgArgs(msg) {
		//TODO
	}

	parseCommand(msg) {
		let tokens = msg.text.split(' ');
		let command = tokens[0].charAt(0) === '/' ?
			tokens.shift() : undefined;
		let text = tokens.length > 0 ? tokens.join(' ') : undefined;

		return {
			command: command,
			text: text
		}
	}
	
	isCommand(msg) {
		return msg.text.charAt(0) === '/';
	}
}

module.exports = BotWrapper;