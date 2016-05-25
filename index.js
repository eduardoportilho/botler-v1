var bot = require('./bot');

if(process.env.NODE_ENV === 'production') {
	require('./web')(bot);
}
