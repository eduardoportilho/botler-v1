var token = '203420973:AAFdCYhHjlsautYpwFyQtbZKRr7Ecet83nM';
var webhook = 'https://arminio.herokuapp.com:443/';

var TelegramBot = require('node-telegram-bot-api');


module.exports = function () {
	var botOptions = {
		webHook: {
			port: process.env.PORT,
	        host: process.env.HOST
		}
	};
	var bot = new TelegramBot(token, botOptions);
	bot.setWebHook(webhook);
	bot.getMe().then(function (me) {
		console.log('bot server started...');
		bot.on('text', function (msg) {
			var chatID = msg.chat.id;
			bot.sendMessage(chatID, 'xoxox');
		});
	});
};






/*

	var port = process.env.PORT || 5000;
	var host = '0.0.0.0';
	var bot = new Bot(token, {webHook: {port: port, host: host}});

	//bot = new Bot(token);
	bot.setWebHook(webhook);
	bot.getMe().then(function (user) {
		console.log('getMe: ' + user.id);
		bot.on('text', function (msg) {

            // get chat id
            var chatID = msg.chat.id;
			console.log('text: ' + chatID);
            bot.sendMessage(chatID, 'AAA');

		});

  	});
}
// else {
//   bot = new Bot(token, { polling: true });
// }
/*


if(process.env.NODE_ENV === 'production') {...
console.log('bot server started...');

// Matches /hello [whatever]
bot.onText(/\/hello (.+)/, function (msg, match) {
  console.log('=>_<= Message received: ' + msg + ' / ' + match);

  var fromId = msg.from.id;
  var name = match[1];
  bot.sendMessage(fromId, 'Hello ' + name + '!');
});

// Any kind of message
bot.on('message', function (msg) {
  var chatId = msg.chat.id;
  // photo can be: a file path, a stream or a Telegram file_id
  var photo = 'cats.png';
  bot.sendPhoto(chatId, photo, {caption: 'Lovely kittens'});
  bot.sendMessage(chatId, 'Hello!');
});
module.exports = bot;
*/

