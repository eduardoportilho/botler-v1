var token = '203420973:AAFdCYhHjlsautYpwFyQtbZKRr7Ecet83nM';

var Bot = require('node-telegram-bot-api');
var bot;

if(process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
  bot.setWebHook('https://my-web-root.com/' + bot.token);
}
else {
  bot = new Bot(token, { polling: true });
}

console.log('bot server started...');

bot.onText(/^\/say_hello (.+)$/, function (msg, match) {
  var name = match[1];
  bot.sendMessage(msg.chat.id, 'Hello ' + name + '!').then(function () {
    console.log('Reply sent!');
  });
});

module.exports = bot;
