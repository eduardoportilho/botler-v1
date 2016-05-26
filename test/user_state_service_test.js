var userStateService 	= require('../src/user_state_service'),
	db 					= require('../src/db_service'),
	constants 			= require('../src/consts');

/*
	Stimulus represented as state:userAction
*/
describe("User State Service", function() {
	var currentState = constants.userState.none;

	before(function(){
		sinon.stub(db, 'getUserState').returns(currentState);
	});

	after(function(){
		request.get.restore();
	});

	it("should return 'getLocation' for none:/go", function() {
		currentState = constants.userState.none;
		var botAction = userStateService.getNextBotAction({
			from: {id:0},
			text:'/go'
		});

		expect(botAction).to.equal(constants.botAction.getLocation);
    });
});