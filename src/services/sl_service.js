let request = require('request');
let Promise = require('promise');
let Station = require('../model/station');
let env 	= require('../env_config');

class SlService {

	constructor() {
		this.locationApiKey = env.location.apiKey;
		this.locationApiEndPoint = env.location.endPoint;
	}

	findStations(searchstring) {
		let requestOptions = {
			url: this.locationApiEndPoint,
			qs: {
				key: this.locationApiKey,
				searchstring: searchstring,
				stationsonly: true,
				maxresults: 10
			}
		};

		return new Promise((fulfill, reject) => {
			request(requestOptions, (err, response, body) => {
	  			if (err)  {
	  				reject(err);
	  			}
	  			//body: StatusCode, Message, ExecutionTime, ResponseData
			    let bodyObj = JSON.parse(body);
			    let responseData = bodyObj['ResponseData'];
			    let stations = responseData.map(obj => Station.fromObject(obj));
			    fulfill(stations);
	  		});
	  	});
	}

	findDepartures(station) {
		//TODO
	}
	
}

module.exports = new SlService();