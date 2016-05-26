https://www.trafiklab.se/api/sl-narliggande-hallplatser/sl-narliggande-hallplatser
var request = require('request'),
	Promise = require('promise'),
	env 	= require('./env_config'),
	logger 	= require('./logger');

function NearbyStopsServices() {
	this.apiKey = env.nearbyStops.apiKey;
	this.apiEndPoint = env.nearbyStops.endPoint;
    return this;
};

NearbyStopsServices.prototype.getNearbyStops = function(lat, long, maxResults) {
	var requestOptions = {
		url: this.apiEndPoint,
		qs: {
			key: this.apiKey,
			originCoordLat: lat,
			originCoordLong: long,
			maxresults: maxResults,
			radius: 1000,
			lang: 'en'
		}
	};

	return new Promise(function (fulfill, reject) {
		request(requestOptions,
	  		function(err, response, body) {
	  			if (err)  {
	  				reject(err);
	  			}
			    var bodyObj = JSON.parse(body);
    			logger.debug('getNearbyStops: ' + JSON.stringify(bodyObj));
	  			/*
	  			body: {
					"LocationList":{
						"noNamespaceSchemaLocation":"hafasRestLocation.xsd",
						"StopLocation":[
							{"idx":"1","name":"Tegnérgatan (på B Jarlsgatan) (Stockholm)","id":"300101088","lat":"59.341543","lon":"18.064695","dist":"95"},
							{"idx":"2","name":"Jarlaplan (Stockholm)","id":"300101085","lat":"59.344438","lon":"18.062035","dist":"280"},
							{"idx":"3","name":"Rådmansgatan (på Sveavägen) (Stockholm)","id":"300101032","lat":"59.340159","lon":"18.059203","dist":"307"}
						]
					}
				}
				*/
			    var responseData = bodyObj['LocationList']['StopLocation'];
			    fulfill(responseData);
	  		}
	  	);
  	});
};

module.exports = new NearbyStopsServices();
