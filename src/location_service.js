var request = require('request'),
	Promise = require('promise'),
	env 	= require('./env_config'),
	logger 	= require('./logger');

function LocationService() {
	this.apiKey = env.location.apiKey;
	this.apiEndPoint = env.location.endPoint;
    return this;
};

LocationService.prototype.getLocation = function(searchstring) {
	var requestOptions = {
		url: this.apiEndPoint,
		qs: {
			key: this.apiKey,
			searchstring: searchstring
		}
	};

	return new Promise(function (fulfill, reject) {
		request(requestOptions,
	  		function(err, response, body) {
	  			if (err)  {
	  				reject(err);
	  			}
			    var bodyObj = JSON.parse(body);
	  			//body: StatusCode, Message, ExecutionTime, ResponseData
			    var responseData = bodyObj['ResponseData'];
			    fulfill(responseData);
	  		}
	  	);
  	});
};

module.exports = new LocationService();
