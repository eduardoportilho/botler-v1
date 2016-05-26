var locationService = require('../src/location_service'),
    env             = require('./env_config'),
    Bot             = require('node-telegram-bot-api'),
    request         = require('request'),
    telegramToken   = env.telegramToken,
    host            = env.host,
    webhook         = host + telegramToken;

var bot;
if(process.env.NODE_ENV === 'production') {
    bot = new Bot(telegramToken);
    bot.setWebHook(webhook);
    console.log('\n'+'=>_<= Bot server started with webhook: ' + webhook + '\n');
} else {
    bot = new Bot(telegramToken, { polling: true });
    console.log('\n=>_<= Bot server started on pooling mode...\n');
}

// hello command
bot.onText(/^\/echo (.+)$/, function (msg, match) {
    var text = match[1];
    bot.sendMessage(msg.chat.id, 'echo: ' + text);
});

// station command
bot.onText(/^\/station (.+)$/, function (msg, match) {
    var search = match[1];
    console.log('=>_<= /station request: '+ search + '\n');
    locationService.getLocation(search)
        .then(function(locations) {
            var locationNames = locations.map(function(location) {
                return location["Name"];
            });
            bot.sendMessage(msg.chat.id, 
                'Here is what I got: ' + locationNames.join(', '));
        }, function(err) {
            bot.sendMessage(msg.chat.id, 'Sorry, the API is not working');
            console.log('=>_<=  API error:', err, '\n'); 
        });
});

// messages
bot.on('message', function (msg) {
    console.log('\n=>_<= Message received: ' + JSON.stringify(msg) + '\n');
    if(msg.text.indexOf('/') === 0) {
        return; //ignore commands
    };
    var chatId = msg.chat.id;
    bot.sendMessage(chatId, 
        'Sorry ' + msg.from.first_name + 
        ', I don\'t userstand "' + msg.text + '" yet... :-(');
});

module.exports = bot;
