var token = '203420973:AAFdCYhHjlsautYpwFyQtbZKRr7Ecet83nM';

/*
var webhook = 'https://arminio.herokuapp.com:443/';
port: process.env.PORT,
host: process.env.HOST
*/

var Bot = require('node-telegram-bot-api');
var bot;

if(process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
  bot.setWebHook('https://arm1nio.herokuapp.com/' + bot.token);
}
else {
  bot = new Bot(token, { polling: true });
}

console.log('bot server started...');

// hello command
bot.onText(/^\/say_hello (.+)$/, function (msg, match) {
  var name = match[1];
  bot.sendMessage(msg.chat.id, 'Hello ' + name + '!').then(function () {
    // reply sent!
  });
});

// sum command
bot.onText(/^\/sum((\s+\d+)+)$/, function (msg, match) {
  var result = 0;
  match[1].trim().split(/\s+/).forEach(function (i) {
    result += (+i || 0);
  })
  bot.sendMessage(msg.chat.id, result).then(function () {
    // reply sent!
  });
});

module.exports = bot;




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

