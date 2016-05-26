var chai 	= require('chai'),
	sinon   = require('sinon');

chai.config.includeStack = true;

global.sinon = sinon;
global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;