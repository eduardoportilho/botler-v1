let BotWrapper = require('../../src/model/bot_wrapper');


describe("Bot Wrapper Test", () => {
	describe("parseCommand", () => {

		it("should extract command", function() {
			let botWrapper = new BotWrapper(null);
			let msg = botWrapper.parseCommand({
				text: '/cmd'
			});

			expect(msg.command).to.equal('/cmd');
			expect(msg.text).to.equal(undefined);
			
	    });

	});
});
