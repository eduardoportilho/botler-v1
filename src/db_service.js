var env 		= require('./env_config'),
	firebase 	= require("firebase");

function DbService() {
	firebase.initializeApp(env.firebase);

	/*
	var db = firebase.database();
	var ref = db.ref("restricted_access/secret_document");
	ref.once("value", function(snapshot) {
	  console.log(snapshot.val());
	});
	*/
    return this;
};

DbService.prototype.getUserState = function(userid) {
	firebase.database().ref('/userstate/' + userid).once('value').then(function(snapshot) {
	  var state = snapshot.val();
	  // ...
	});
	return 'unknown';
};

DbService.prototype.setUserState = function(userid, state) {
	firebase.database().ref('userstate/' + userid).set(state);
};

module.exports = new DbService();
