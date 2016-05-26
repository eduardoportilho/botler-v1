function DbService() {
    return this;
};

DbService.prototype.getUserState = function(userid) {
	return 'unknown';
};

module.exports = new DbService();
