const tests = require('./fixtures/test');

describe('headers', function() {
	it('accept headers', function() {
		return tests.testNonBody({
			headers: {
				accept:
					'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01',
				'accept-encoding': 'gzip, deflate, br'
			}
		});
	});

	it('Authorization header', function() {
		return tests.testUrlSearchParams({
			headers: {
				Authorization: 'Api-Key sdescdccsefgd3d0',
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			}
		});
	});

	it('WWW-Authenticate header', function() {
		return tests.testJson({
			headers: {
				'WWW-Authenticate':
					'Basic realm="Access to the staging site", charset="UTF-8"'
			}
		});
	});

	it('cookies', function() {
		return tests.testJson({
			headers: {
				Cookie: 'yummy_cookie=choco; tasty_cookie=strawberry'
			}
		});
	});
});
