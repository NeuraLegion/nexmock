const tests = require('./fixtures/test');

describe('body-types', function() {
	it('mocks get request', function() {
		return tests.testNonBody();
	});

	it('mocks post request with text body', function() {
		return tests.testTextBody();
	});

	describe('json', function() {
		it('mocks post request with json body', function() {
			return tests.testJson({ stringify: true });
		});

		it('mocks post request with js object body', function() {
			return tests.testJson({ stringify: false });
		});
	});

	it('mocks post request with blob body', function() {
		return tests.testTextBody();
	});

	it('mocks post request with file body', function() {
		return tests.testFile({ fileName: 'image.png' });
	});

	it('mocks get request with form_urlencoded body', function() {
		return tests.testUrlSearchParams();
	});

	it('mocks post request with form-data body', function() {
		return tests.testFormData();
	});

	describe('typed array', function() {
		const Ctors = [
			Int8Array,
			Uint8Array,
			Uint8ClampedArray,
			Int16Array,
			Uint16Array,
			Int32Array,
			Uint32Array,
			Float32Array,
			Float64Array
		];
		Ctors.forEach(function(Ctor) {
			it(`mocks post request with ${Ctor.name} body`, function() {
				return tests.typedArrayTestFactory(Ctor)();
			});
		});
	});
});
