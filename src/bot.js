var TelegramBot     = require('node-telegram-bot-api'),
    request         = require('request'),
    locationService = require('./location_service'),
    env             = require('./env_config'),
    logger          = require('./logger');

function ArminioBot() {
    var self = (this instanceof ArminioBot) ? this : Object.create(ArminioBot.prototype);

    self.telegramToken = env.telegramToken;
    self.host = env.host;
    self.webhook = self.host + self.telegramToken;

    if(process.env.NODE_ENV === 'production') {
        self.bot = new TelegramBot(self.telegramToken);
        self.bot.setWebHook(self.webhook);
        logger.debug('Bot server started with webhook.');
    } else {
        self.bot = new TelegramBot(self.telegramToken, { polling: true });
        logger.debug('Bot server started on pooling mode.');
    }

    self.bot.onText(/^\/echo (.+)$/, function(msg, match) {
        self.echo.call(self, msg, match);
    });

    self.bot.onText(/^\/station (.+)$/, function(msg, match) {
        self.station.call(self, msg, match);
    });

    self.bot.on('message', function(msg) {
        self.handleMessage.call(self, msg);
    });

    return self;
};

ArminioBot.prototype.echo = function(msg, match) {
    var text = match[1];
    this.bot.sendMessage(msg.chat.id, 'echo: ' + text);
}

ArminioBot.prototype.station = function(msg, match) {
    var self = this;
    var search = match[1];
    logger.debug('/station request: '+ search);
    locationService.getLocation(search)
        .then(function(locations) {           
            var locationNames = locations.map(function(location) {
                return location["Name"];
            });
            self.bot.sendMessage(msg.chat.id, 
                'Here is what I got: ' + locationNames.join(', '));
        }, function(err) {
            self.bot.sendMessage(msg.chat.id, 'Sorry, the API is not working');
            logger.debug('Location API error: ' + err); 
        });
};

ArminioBot.prototype.handleMessage = function(msg) {
    if(msg.text.indexOf('/') === 0) {
        return; //ignore commands
    };
    logger.debug('Message received: ' + JSON.stringify(msg));
    var chatId = msg.chat.id;
    this.bot.sendMessage(chatId, 
        'Sorry ' + msg.from.first_name + 
        ', I don\'t userstand "' + msg.text + '" yet... :-(');
};

ArminioBot.prototype.processUpdate = function(body) {
    this.bot.processUpdate(body);
}

module.exports = new ArminioBot();
