var telegramToken = process.env['telegram_token'],
  locationApiKey = process.env['sl_location_api_key'],
  realtimeApiKey = process.env['sl_realtime3_api_key'];

var host = 'https://arm1nio.herokuapp.com/';
var Bot = require('node-telegram-bot-api');
var request = require('request');

var bot;
if(process.env.NODE_ENV === 'production') {
  bot = new Bot(telegramToken);
  bot.setWebHook(host + bot.telegramToken);
} else {
  bot = new Bot(telegramToken, { polling: true });
}

console.log('bot server started...');

// hello command
bot.onText(/^\/say_hello (.+)$/, function (msg, match) {
  var name = match[1];
  bot.sendMessage(msg.chat.id, 'Hello ' + name + '!').then(function () {
    // reply sent!
  });
});

// key=992cf8d86fe749efa3f51a2ad7ca5db0&searchstring=tunagård
bot.onText(/^\/station (.+)$/, function (msg, match) {
  var search = match[1];
  request({
    url: 'http://api.sl.se/api2/typeahead.json',
    qs: {
      key: locationApiKey,
      searchstring: search
    }
  }, function(err, response, body){
    if(err) {
      bot.sendMessage(msg.chat.id, 'Sorry, the API is not working');
      console.log(err); 
      return; 
    }
    bot.sendMessage(msg.chat.id, 'Here is what I got: ' + body);
  });

  bot.sendMessage(msg.chat.id, 'Hello ' + name + '!').then(function () {
    // reply sent!
  });
});

// Any kind of message
bot.on('message', function (msg) {
  var chatId = msg.chat.id;
  bot.sendMessage(chatId, 
    'Sorry ' + msg.from.first_name + 
    ', I don\'t userstand "' + msg.text + '" yet... :-(')
  .then(function () {});
});

module.exports = bot;
