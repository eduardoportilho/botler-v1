var proxyquire 	=  require('proxyquire'),
	locationService;

describe("Location Service", function() {
	it("should use dev config", function() {
		var service = require('../src/location_service');
		expect(service.apiKey).to.equal('locationApiKey');
		expect(service.apiEndPoint).to.equal('locationEndPoint');
    });

	describe("(on success)", function() {
		
		before(function(){
			var requestStub = sinon.stub()
				.yields(null, null, JSON.stringify({
					ResponseData: ['a', 'b', 'c']
				}));
			locationService = proxyquire('../src/location_service', { 
				'request': requestStub 
			});
		});

		after(function(){
			locationService = undefined;
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
			var requestStub = sinon.stub()
				.yields('test error', null, null);

			locationService = proxyquire('../src/location_service', { 
				'request': requestStub 
			});
		});

		after(function(){
			locationService = undefined;
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
