function DbService() {
    return this;
};

DbService.prototype.getUserState = function(userid) {
	return 'unknown';
};

DbService.prototype.setUserState = function(userid, state) {
};

module.exports = new DbService();
