var express 	= require('express'),
	bodyParser 	= require('body-parser'),
	packageInfo = require('../package.json'),
	logger 		= require('./logger');

function Web() {}

Web.prototype.init = function(bot) {
	this.app = express();
	this.app.use(bodyParser.json());

	this.app.get('/', function (req, res) {
		res.json({ version: packageInfo.version });
	});


	var webhookPath = '/' + bot.telegramToken;
  	this.app.post(webhookPath, function (req, res) {
		logger.debug('Webhook hit: ' + JSON.stringify(req.body));
		bot.processUpdate.call(bot, req.body);
		res.sendStatus(200);
	});

	var server = this.app.listen(process.env.PORT, function () {
		var host = server.address().address;
		var port = server.address().port;
		logger.debug('Web server started at http://' + host +':' + port);
		logger.debug('Webhook up on: '+ webhookPath);
	});
}

module.exports = new Web();
