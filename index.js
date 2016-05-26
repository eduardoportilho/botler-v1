var config = {
	'telegramToken': process.env['telegram_token'],
	'locationApiKey': process.env['sl_location_api_key'],
	'realtimeApiKey': process.env['sl_realtime3_api_key']
};

var locationService = require('./location_service')(config.locationApiKey);
var bot = require('./bot');
require('./web')(bot);
