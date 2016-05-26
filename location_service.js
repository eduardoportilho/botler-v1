var request = require('request'),
	Promise = require('promise');

function LocationService(apiKey) {
	this.apiKey = apiKey;
	this.apiEndPoint = 'http://api.sl.se/api2/typeahead.json';
    return this;
};

LocationService.prototype.getLocation = function(searchstring) {
	return new Promise(function (fulfill, reject) {
		request.get(
			{
		    	url: this.apiEndPoint,
		    	qs: {
		      		key: this.apiKey,
		      		searchstring: searchstring
		    	}
	  		},
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

module.exports = function (apiKey) {
	return new LocationService(apiKey);
};
