const tests = require('./fixtures/test');

describe('urls', function() {
	it('string relative url', function() {
		return tests.testNonBody({
			url: '/test'
		});
	});

	it('string absolute url', function() {
		return tests.testNonBody({
			url: 'https://nex.neuralegion.app/test'
		});
	});
});
