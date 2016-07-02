/*
	u: /go [station name]
	b: (init) 
		Sure, [select or ]type the name of the station
		(List stations saved on user prefs)
		(List stations found for [station name])
	u: "Tunag" or <station 1>
	b: Here is what I found, pick one or type again: [station 1, ...]
	u: <station 1>
	b: 
		(save station on user prefs)
		Here are the departures on this location
 */

let slService = require('../services/sl_service');
let botService = require('');
let dbService = require(...);


const ACTION_CMD = '/go';
const CMD_GET_SELECTED_STATION = 'GoAction:getSelectedStation';
const CMD_GET_STATION_NAME = 'GoAction:getStationName';

class GoAction {

	processMessage(msg, userState, bot) {
		this.msg = msg;
		this.parsedMsg = bot.parseCommand(msg);
		this.userState = userState;
		this.bot = bot;

		//User has entered a station name to search
		if(userState.currentCommand === CMD_GET_STATION_NAME) {
			this.onStationNameEntered();
		}
		//User has selected a station
		else if(userState.currentCommand === CMD_GET_SELECTED_STATION) {
			this.onStationSelected();
		}
		else {
			if(this.parsedMsg.command === ACTION_CMD) {
				this.onInitAction();
			}
		}

	}

	// events from user

	onInitAction() {
		//user has provided a text to search?
		if (this.parsedMsg.text) { 
			this.onStationNameEntered()
		}
		//user has saved stations?
		else if (userState.hasSavedStations()) { 
			let stations = userState.getSavedStations();
			presentStationsToUser(stations);
		}
		//ask for a station name
		else {
			this.askUserForStationName();
		}
	}

	onStationNameEntered() {
		//user has provided a text to search
		if (this.parsedMsg.text) { 
			slService.findStations(args[0])
				.then(this.presentStationsToUser);
		}
		//no args? ask again
		else {
			this.askUserForStationName();
		}

	}

	onStationSelected() {
		let station = getStationFromMessage(this.msg);
		slService.findDepartures(station)
				.then(departures => {
					this.presentDeparturesToUser(station, departures);
				});
	}

	// actions to the user

	askUserForStationName() {
		dbService.updateCurrentCommand(this.userState, CMD_GET_STATION_NAME);
		botService.reply(bot, msg, 'Sure, please type a part of the station name');
	}

	presentStationsToUser(stations) {
		dbService.updateCurrentCommand(this.userState, CMD_GET_SELECTED_STATION);

		let stationNames = stations.map(station => station.name);
		botService.reply(this.bot, this.msg, 
			"Sure, please select a station or type a part of it's name to search for it",
			stationNames);
	}

	presentDeparturesToUser(station, departures) {
		//this action is done!
		dbService.updateCurrentCommand(this.userState, '');

		let departureDescriptions = departures.map(this.getDepartureDescription);
		botService.reply(this.bot, this.msg, 
			`Here are the next departures from ${station}:`,
			departureDescriptions);

	}

	// helpers

	getStationFromMessage(msg) {
		//TODO
	}

	getDepartureDescription(departure) {
		//TODO
	}

}

module.exports.GoAction