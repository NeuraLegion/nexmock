const tests = require('./fixtures/test');

describe('methods', function() {
	it('mocks get request', function() {
		return tests.testNonBody();
	});

	it('mocks head request', function() {
		return tests.testNonBody({ status: 204, method: 'HEAD' });
	});

	it('mocks post request', function() {
		return tests.testJson({ stringify: true, status: 201, method: 'POST' });
	});

	it('mocks put request', function() {
		return tests.testFile({ fileName: 'image.png', method: 'PUT' });
	});

	it('mocks delete request', function() {
		return tests.testUrlSearchParams({ status: 204, method: 'DELETE' });
	});

	it('mocks patch request', function() {
		return tests.testUrlSearchParams({ status: 200, method: 'PATCH' });
	});
});
