var userStateService 	= require('../src/user_state_service'),
	db 					= require('../src/db_service'),
	constants 			= require('../src/consts');

/*
	Stimulus represented as state:userAction
*/
describe("User State Service", function() {

	// Get the next state fora a given stimulus

	describe("Get User Action", function() {
		it("should identify /go", function() {
			expect(userStateService.getUserActionId({ text:'/go' })).to.equal(constants.userAction.goCmd);
	    });

		it("should identify /number", function() {
			expect(userStateService.getUserActionId({ text:'/123' })).to.equal(constants.userAction.numberCmd);
	    });
			
		it("should identify [location]", function() {
			expect(userStateService.getUserActionId({ location: 'any location' })).to.equal(constants.userAction.location);
	    });
			
		it("should identify text message", function() {
			expect(userStateService.getUserActionId({ text: 'any text' })).to.equal(constants.userAction.text);
	    });
			
		it("should not identify unknown commands", function() {
			expect(userStateService.getUserActionId({ text: '/unknown' })).to.equal(undefined);
			expect(userStateService.getUserActionId("wrong type")).to.equal(undefined);
			expect(userStateService.getUserActionId({})).to.equal(undefined);
	    });
    });

	// Get the next state fora a given stimulus
	// none -> goCollectLocation -> goCollectStop -> none

	describe("Get Next User State", function() {

		it("should return same state for an unknown stimulus", function() {
			nextState = userStateService.getNextUserState(
				constants.userState.goCollectLocation, 
				'unknown');
			expect(nextState).to.equal(constants.userState.goCollectLocation);
	    });
	    
		it("should return goCollectLocation for none:/go", function() {
			var nextState = userStateService.getNextUserState(
				constants.userState.none,
				constants.userAction.goCmd);
			expect(nextState).to.equal(constants.userState.goCollectLocation);
	    });
	    
		it("should return goCollectStop for goCollectLocation:[location]", function() {
			var nextState = userStateService.getNextUserState(
				constants.userState.goCollectLocation,
				constants.userAction.location);
			expect(nextState).to.equal(constants.userState.goCollectStop);
	    });
	    
		it("should return goCollectStop for goCollectStop:text", function() {
			var nextState = userStateService.getNextUserState(
				constants.userState.goCollectStop,
				constants.userAction.text);
			expect(nextState).to.equal(constants.userState.goCollectStop);
	    });
	    
		it("should return none for goCollectStop:/numberCmd", function() {
			var nextState = userStateService.getNextUserState(
				constants.userState.goCollectStop,
				constants.userAction.numberCmd);
			expect(nextState).to.equal(constants.userState.none);
	    });
    });

	// Get the next bot action and update state
	// getLocation -> getStop -> 

	describe("Get Next Bot Action", function() {
		var dbMock, shouldCallDbgetUserState, shouldCallDbSetUserState;

		beforeEach(function(){
			dbMock = sinon.mock(db);
		});

		afterEach(function(){
			// db.getUserState.restore();
			dbMock.restore();
		});

		it("should return 'msgDidntUnderstand' for an unknown user action (and dont't change state)", function() {
			//given
			shouldCallDbgetUserState = dbMock.expects("getUserState")
				.once().withArgs(0)
				.returns(constants.userState.none);
			shouldCallDbSetUserState = dbMock.expects("setUserState")
				.once().withArgs(0, constants.userState.none);

			//when
			var botAction = userStateService.getNextBotActionAndUpdateState({
				from: {id:0},
				text:'/unknown_user_action'
			});
			//then
			expect(botAction).to.equal(constants.botAction.msgDidntUnderstand);
			dbMock.verify();
	    });

		it("should return 'askLocation' and change state to 'goCollectLocation' for none:/go", function() {
			//given
			shouldCallDbgetUserState = dbMock.expects("getUserState")
				.once().withArgs(0)
				.returns(constants.userState.none);
			shouldCallDbSetUserState = dbMock.expects("setUserState")
				.once().withArgs(0, constants.userState.goCollectLocation);
			//when
			var botAction = userStateService.getNextBotActionAndUpdateState({
				from: {id:0},
				text:'/go'
			});
			//then
			expect(botAction).to.equal(constants.botAction.askLocation);
			dbMock.verify();
	    });

		it("should return 'listStops' and change state to 'goCollectStop' for goCollectLocation:[location]", function() {
			//given
			shouldCallDbgetUserState = dbMock.expects("getUserState")
				.once().withArgs(0)
				.returns(constants.userState.goCollectLocation);
			shouldCallDbSetUserState = dbMock.expects("setUserState")
				.once().withArgs(0, constants.userState.goCollectStop);
			
			//when
			var botAction = userStateService.getNextBotActionAndUpdateState({
				from: {id:0},
				location: 'any location'
			});
			//then
			expect(botAction).to.equal(constants.botAction.listStops);
			dbMock.verify();
	    });

		it("should return 'listDepartures' and change state to none for goCollectStop:/numberCmd", function() {
			//given
			shouldCallDbgetUserState = dbMock.expects("getUserState")
				.once().withArgs(0)
				.returns(constants.userState.goCollectStop);
			shouldCallDbSetUserState = dbMock.expects("setUserState")
				.once().withArgs(0, constants.userState.none);

			//when
			var botAction = userStateService.getNextBotActionAndUpdateState({
				from: {id:0},
				text: '/1'
			});
			//then
			expect(botAction).to.equal(constants.botAction.listDepartures);
			dbMock.verify();
	    });

		it("should return 'listStops' and dont't change state for goCollectStop:text", function() {
			//given
			shouldCallDbgetUserState = dbMock.expects("getUserState")
				.once().withArgs(0)
				.returns(constants.userState.goCollectStop);
			shouldCallDbSetUserState = dbMock.expects("setUserState")
				.once().withArgs(0, constants.userState.goCollectStop);
			
			//when
			var botAction = userStateService.getNextBotActionAndUpdateState({
				from: {id:0},
				text: 'search string'
			});
			//then
			expect(botAction).to.equal(constants.botAction.listStops);
			dbMock.verify();
	    });
    });
});












