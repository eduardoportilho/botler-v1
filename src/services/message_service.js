/*
{
    "message_id": 237,
    "from": {
        "id": 200177024,
        "first_name": "Eduardo",
        "last_name": "Portilho",
        "username": "eduardoportilho"
    },
    "chat": {
        "id": 200177024,
        "first_name": "Eduardo",
        "last_name": "Portilho",
        "username": "eduardoportilho",
        "type": "private"
    },
    "date": 1467556940,
    "text": "Vc"
}
*/



class MessageService {

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

module.exports = new MessageService();