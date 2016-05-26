function Logger() {
}

Logger.prototype.debug = function() {
	var messages = Array.prototype.slice.call(arguments);
	messages.forEach(this._debug);
}

Logger.prototype._debug = function(message) {
	console.log('=>_<= '+ message);
}

module.exports = new Logger();