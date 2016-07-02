var production = {
	telegramToken: process.env['telegram_token'],
	host: 'https://arm1nio.herokuapp.com/',
	location: {
		apiKey: process.env['sl_location_api_key'],
		endPoint: 'http://api.sl.se/api2/typeahead.json'
	},
	realtime: {
		apiKey: process.env['sl_realtime3_api_key'],
		endPoint: 'http://api.sl.se/api2/realtimedepartures.json'
	},
	nearbyStops: {
		apiKey: process.env['sl_nearby_stops_api_key'],
		endPoint: 'http://api.sl.se/api2/nearbystops.json'
	},
	firebase: {
		serviceAccount: {
			projectId: process.env['fbase_project_id'],
			clientEmail: process.env['fbase_client_email'],
			privateKey: process.env['fbase_private_key']
		},
		databaseURL: process.env['fbase_database_url'],
		apiKey: process.env['fbase_api_key'],
		authDomain: process.env['fbase_auth_domain'],
		storageBucket: process.env['fbase_storage_bucket']

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
	},
	firebase: {
		serviceAccount: {
			projectId: 'firebaseProjectId',
			clientEmail: 'firebaseClientEmail',
			privateKey: 'firebasePrivateKey'
		},
		databaseURL: 'firebaseDatabaseUrl',
		apiKey: 'firebaseApiKey',
		authDomain: 'firebaseAuthDomain',
		storageBucket: 'firebaseStorageBucket'
	}
};

var isProduction = process.env.NODE_ENV === 'production';

module.exports = isProduction ? production : dev;
