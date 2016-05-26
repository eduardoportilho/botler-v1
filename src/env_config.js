var production = {
	telegramToken: process.env['telegram_token'],
	host: 'https://arm1nio.herokuapp.com/',
	//https://www.trafiklab.se
	location: {
		apiKey: process.env['sl_location_api_key'],
		endPoint: 'http://api.sl.se/api2/typeahead.json'
	},
	//https://www.trafiklab.se
	realtime: {
		apiKey: process.env['sl_realtime3_api_key'],
		endPoint: 'http://api.sl.se/api2/realtimedepartures.json'
	}
};

var dev = {
	telegramToken: 'telegramToken',
	host: 'host',
	location: {
		apiKey: 'locationApiKey',
		endPoint: 'locationEndPoint'
	},
	realtime: {
		apiKey: 'realtimeApiKey',
		endPoint: 'realtimeEndPoint'
	}
};

var isProduction = process.env.NODE_ENV === 'production';

module.exports = isProduction ? production : dev;
