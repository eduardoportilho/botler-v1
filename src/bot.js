var TelegramBot         = require('node-telegram-bot-api'),
    request             = require('request'),
    //locationService     = require('./location_service'),
    //userStateService    = require('./user_state_service'),
    nearbyStopsService  = require('./nearby_stops_service'),
    env                 = require('./env_config'),
    logger              = require('./logger');

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

    // self.bot.onText(/^\/echo (.+)$/, function(msg, match) {
    //     self.echo.call(self, msg, match);
    // });

    // self.bot.onText(/^\/station (.+)$/, function(msg, match) {
    //     self.station.call(self, msg, match);
    // });

    // self.bot.onText(/^\/go$/, function(msg, match) {
    //     self.go.call(self, msg, match);
    // });

    self.bot.on('message', function(msg) {
        userService.loadUserState(msg)
            .then(function(userState) {
                //executa ação...

                // se for um comando, inicia uma nova interação
                // se não, resgata a iteração corrente
                // se não houver, não entendi
                var iteraction = self.getCurrentIteraction(msg, userState);

                iteraction.run(msg, userState);
                // var actionId = getNextAction(msg, userState);
                // switch(actionId) {
                //     case '':
                // }

            });

        //old code
        /*
        var action = userStateService.getNextBotActionAndUpdateState(msg);
        if(typeof self[action] !== "funcion") {

        }
        self[action].call(self, msg);
        */
/*
askLocation
listStops
listDepartures
msgDidntUnderstand
*/

        // if(msg.location) {
        //     self.handleLocation.call(self, msg);
        // } else {
        //     self.handleMessage.call(self, msg);
        // }
    });

    return self;
};

ArminioBot.prototype.getCurrentIteraction = function(msg, userState) {
    var iteractionId;
    if(msg.text.indexOf('/') === 0) {
        iteractionId = msg.text;
    } else {
        iteractionId = userState.getCurrentIteractionId()
    }
    if(!iteractionId) {
        iteractionId = '/unknown';
    }

    if(msg.text.indexOf('/save') === 0) {
        return require('./iteractions/save_location');
    } else if(msg.text === '/go') {
        return require('./iteractions/list_departures');
    } else if(msg.text === '/unknown') {
        return require('./iteractions/unknown');
    }
};









//old...

ArminioBot.prototype.msgDidntUnderstand = function(msg) {
    var chatId = msg.chat.id;
    var reply = 'Sorry ' + msg.from.first_name + 
            ', I don\'t userstand "' + msg.text + '" yet... :-(';
    
    this.bot.sendMessage(chatId, reply, {reply_markup: { hide_keyboard: true }});
};

ArminioBot.prototype.askLocation = function(msg) {
    this.bot.sendMessage(msg.chat.id, 
        'Sure, could you please send me your current location?', {
        reply_markup: {
            resize_keyboard: true,
            one_time_keyboard: true,
            keyboard: [
                [{
                    text: 'Send my current location',
                    request_location: true
                }]
            ]
        }
    });
};

ArminioBot.prototype.listStops = function(msg) {
    var self = this,
        chatId = msg.chat.id,
        lat = msg.location.latitude,
        long = msg.location.longitude;

    nearbyStopsService.getNearbyStops(lat, long, 10)
        .then(function(stops) {
            var stopsMessage = stops.map(function(stop) {
                return "/" + stop["idx"] + ' ' + stop["name"];
            });
            self.bot.sendMessage(msg.chat.id, 
                'Thanks! Now please choose the desired station:\n' +
                stopsMessage.join('\n')
            );
        }, function(err) {
            logger.debug('Location API error: ' + err);
            self.bot.sendMessage(msg.chat.id, 'Sorry, the API is not working');
        });   
};

ArminioBot.prototype.listDepartures = function(msg) {};


/*
ArminioBot.prototype.echo = function(msg, match) {
    var text = match[1];
    this.bot.sendMessage(msg.chat.id, 'echo: ' + text);
}

ArminioBot.prototype.go = function(msg, match) {
    this.bot.sendMessage(msg.chat.id, 'Sure, could you please send me your current location?', {
        reply_markup: {
            resize_keyboard: true,
            one_time_keyboard: true,
            keyboard: [
                [{
                    text: 'Send my current location',
                    request_location: true
                }]
            ]
        }
    });
}

ArminioBot.prototype.station = function(msg, match) {
    var self = this,
        search = match[1];
    logger.debug('/station request: '+ search);
    locationService.getLocation(search)
        .then(function(locations) {
            var locationNames = locations.map(function(location) {
                return location["Name"];
            });
            self.bot.sendMessage(msg.chat.id, 
                'Here is what I got: ' + locationNames.join(', '));
        }, function(err) {
            logger.debug('Location API error: ' + err);
            self.bot.sendMessage(msg.chat.id, 'Sorry, the API is not working');
        });
};

ArminioBot.prototype.handleLocation = function(msg) {
    var self = this,
        chatId = msg.chat.id,
        lat = msg.location.latitude,
        long = msg.location.longitude;

    nearbyStopsService.getNearbyStops(lat, long, 10)
        .then(function(stops) {
            var stopsMessage = stops.map(function(stop) {
                return "/" + stop["idx"] + ' ' + stop["name"];
            });
            self.bot.sendMessage(msg.chat.id, 
                'Thanks! Now please choose the desired station:\n' +
                stopsMessage.join('\n')
            );
        }, function(err) {
            logger.debug('Location API error: ' + err);
            self.bot.sendMessage(msg.chat.id, 'Sorry, the API is not working');
        });   

}

ArminioBot.prototype.handleMessage = function(msg) {
    if(msg.text && msg.text.indexOf('/') === 0) {
        return; //ignore commands
    };
    logger.debug('Message received: ' + JSON.stringify(msg));
    var chatId = msg.chat.id;
    var reply = 'Sorry ' + msg.from.first_name + 
            ', I don\'t userstand "' + msg.text + '" yet... :-(';
    
    this.bot.sendMessage(chatId, reply, {reply_markup: { hide_keyboard: true }});
};
*/
ArminioBot.prototype.processUpdate = function(body) {
    this.bot.processUpdate(body);
}

module.exports = new ArminioBot();
