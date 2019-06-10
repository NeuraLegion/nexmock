const fetchMock = require('../../../src/client');
const expect = require('chai').expect;
const { b64toBlob, pngInBase64 } = require('./image-utils');
const { xml } = require('./file-utils');

const test = async ({ url = '/', status = 200, reqInit } = {}) => {
	fetchMock.mock(url, status);
	const res = await fetch(url, reqInit);
	expect(res.status).to.equal(status);
	expect(fetchMock.called(url)).to.be.true;
	fetchMock.restore();
	return { res, fetch: fetchMock };
};

module.exports.test = test;

const mergeHeaders = (source, additional) =>
	Object.assign({}, source, additional);

const testNonBody = ({ headers, status, url } = {}) =>
	test({ status, url, reqInit: { headers } });

module.exports.testNonBody = testNonBody;

const testTextBody = ({ method = 'POST', headers, status, url } = {}) => {
	const body = 'text';
	headers = mergeHeaders(headers, { 'Content-Type': 'text/plain' });
	return test({
		url,
		status,
		reqInit: {
			body,
			method,
			headers
		}
	});
};

module.exports.testTextBody = testTextBody;

const testJson = ({
	method = 'POST',
	stringify = false,
	headers,
	status,
	url
} = {}) => {
	const obj = { json: true };
	const body = stringify ? JSON.stringify(obj) : obj;
	headers = mergeHeaders(headers, { 'Content-Type': 'application/json' });
	return test({
		url,
		status,
		reqInit: {
			body,
			method,
			headers
		}
	});
};

module.exports.testJson = testJson;

const testBlob = ({ method = 'POST', headers, status, url } = {}) => {
	const mimeType = 'image/png';
	const body = b64toBlob(pngInBase64, mimeType);
	headers = mergeHeaders(headers, { 'Content-Type': mimeType });
	return test({
		url,
		status,
		reqInit: {
			body,
			method,
			headers
		}
	});
};

module.exports.testBlob = testBlob;

const testFile = ({
	method = 'POST',
	headers,
	status,
	url,
	fileName = 'img.png'
} = {}) => {
	const mimeType = 'image/png';
	const body = new File([b64toBlob(pngInBase64, mimeType)], fileName, {
		type: mimeType,
		lastModified: Date.now()
	});
	headers = mergeHeaders(headers, { 'Content-Type': mimeType });
	return test({
		url,
		status,
		reqInit: {
			body,
			method,
			headers
		}
	});
};

module.exports.testFile = testFile;

const testUrlSearchParams = ({ method = 'GET', headers, status, url } = {}) => {
	const paramsString = 'q=URLUtils.searchParams&topic=api';
	const body = new URLSearchParams(paramsString);
	return test({ status, url, reqInit: { method, body, headers } });
};

module.exports.testUrlSearchParams = testUrlSearchParams;

const testFormData = ({ method = 'POST', headers, status, url } = {}) => {
	const body = new FormData();
	body.append('username', 'Groucho');
	body.append('accountnum', 123456);
	body.append('userfile', xml);
	headers = mergeHeaders(headers, { 'Content-Type': 'multipart/form-data' });
	return test({ status, url, reqInit: { body, method, headers } });
};

module.exports.testFormData = testFormData;

const typedArrayTestFactory = Ctor => {
	const arrayBytes = [
		104,
		116,
		116,
		112,
		115,
		58,
		47,
		47,
		97,
		112,
		105,
		46,
		104,
		110,
		46,
		99,
		111,
		109
	];

	return ({ method = 'POST', headers, status, url } = {}) => {
		const body = new Ctor(arrayBytes);
		return test({ url, status, reqInit: { body, method, headers } });
	};
};

module.exports.typedArrayTestFactory = typedArrayTestFactory;

module.exports.testInt8Array = typedArrayTestFactory(Int8Array);
module.exports.testUint8Array = typedArrayTestFactory(Uint8Array);
module.exports.testUint8ClampedArray = typedArrayTestFactory(Uint8ClampedArray);
module.exports.testInt16Array = typedArrayTestFactory(Int16Array);
module.exports.testUint16Array = typedArrayTestFactory(Uint16Array);
module.exports.testInt32Array = typedArrayTestFactory(Int32Array);
module.exports.testUint32Array = typedArrayTestFactory(Uint32Array);
module.exports.testFloat32Array = typedArrayTestFactory(Float32Array);
module.exports.testFloat64Array = typedArrayTestFactory(Float64Array);
