var request			= require('request'),
	locationService = require('../src/location_service');

describe("Location Service", function() {
	it("should use dev config", function() {
		expect(locationService.apiKey).to.equal('locationApiKey');
		expect(locationService.apiEndPoint).to.equal('locationEndPoint');
    });

	describe("(on success)", function() {
		before(function(){
			sinon.stub(request, 'get')
				.yields(null, null, JSON.stringify({
					ResponseData: ['a', 'b', 'c']
				}));
		});
		after(function(){
			request.get.restore();
		});

		it("getLocation should return response data", function() {
			//the 'return' above is important for mocha to handle the promisse 
			return locationService.getLocation('search')
				.then(function(locations) {
					expect(locations.length).to.equal(3);
				}, function(err) {
					assert.fail(1,0,'Unexpected error: ' + err);
				});
	    });
    });

	describe("(on error)", function() {
		before(function(){
			sinon.stub(request, 'get')
				.yields('test error', null, null);
		});
		after(function(){
			request.get.restore();
		});

		it("getLocation should return the same error", function() {
			return locationService.getLocation('search')
				.then(function(locations) {
					assert.fail(1, 0, "Should have returned an error");
				}, function(err) {
					expect(err).to.equal('test error');
				});
	    });
    });
});
