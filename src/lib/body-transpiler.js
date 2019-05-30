const env = require('browser-or-node');

const MockBodyType = {
	buffer: 'buffer',
	json: 'json',
	multipart: 'multipart',
	file: 'file',
	stream: 'stream',
	form_urlencoded: 'form_urlencoded',
	text: 'text'
};

Object.freeze(MockBodyType);

module.exports.MockBodyType = MockBodyType;

const bodyTranspile = (body, contentType) => {
	if (isJson(body, contentType)) {
		return jsonTranspile(body);
	}

	if (isFormData(body, contentType)) {
		return formDataTranspile(body);
	}

	if (isFile(body)) {
		return blobTranspile(body);
	}

	if (isBuffer(body)) {
		return bufferTranspile(body);
	}

	if (isStream(body)) {
		return streamTranspile(body);
	}

	if (isFormUrlEncoded(body, contentType)) {
		return fromUrlencodedTranspile(body);
	}

	if (isArrayBuffer(body)) {
		return arrayBufferTranspile(body);
	}

	if (isTypeArray(body)) {
		return typedArrayTranspile(body);
	}

	return textTranspile(body);
};

module.exports.bodyTranspile = bodyTranspile;

const arrayBufferToBase64 = buffer => {
	const bytes = new Uint8Array(buffer);

	let binary = '';

	for (let i = 0; i < bytes.byteLength; i++) {
		binary += String.fromCharCode(bytes[i]);
	}

	return window.btoa(binary).replace(/^data:.+\/.+;base64,/, '');
};

const bufferToBase64 = buffer => buffer.toString('base64');

const jsonTranspile = async body => ({
	body: typeof body === 'string' ? JSON.parse(body) : body,
	type: MockBodyType.json
});

const formDataTranspile = async body => {
	const transpiledFormDataEntries = await Promise.all(
		[...body.entries()].map(async ([key, value]) => [
			key,
			await bodyTranspile(value)
		])
	);
	return {
		body: zipEntries(transpiledFormDataEntries),
		type: MockBodyType.multipart
	};
};

const blobTranspile = body =>
	new Promise(resolve => {
		const reader = new FileReader();
		reader.addEventListener('loadend', () =>
			resolve({
				body: reader.result,
				mimeType: body.type,
				fileName: body.name,
				type: MockBodyType.file
			})
		);
		reader.readAsDataURL(body);
	});

const bufferTranspile = async body => ({
	body: bufferToBase64(body),
	type: MockBodyType.buffer
});

const streamTranspile = body =>
	new Promise(resolve => {
		let acc = Buffer.from('');
		body.on('data', chunk => (acc = Buffer.concat([acc, chunk])));
		body.on('end', () =>
			resolve({ body: bufferToBase64(acc), text: MockBodyType.stream })
		);
	});

const fromUrlencodedTranspile = async body => ({
	body: zipEntries([...new URLSearchParams(body).entries()]),
	type: MockBodyType.form_urlencoded
});

const arrayBufferTranspile = async body => ({
	body: arrayBufferToBase64(body),
	type: MockBodyType.buffer
});

const typedArrayTranspile = async body => ({
	body: arrayBufferToBase64(body.buffer),
	type: MockBodyType.buffer
});

const textTranspile = async body => ({ body, type: MockBodyType.text });

const zipEntries = entries =>
	entries.reduce((acc, [key, value]) => {
		if (Array.isArray(acc[key])) {
			acc[key] = [...acc[key], value];
		} else if (!!acc[key]) {
			acc[key] = [value];
		} else {
			acc[key] = value;
		}
		return acc;
	}, {});

const isJson = (body, contentType) =>
	(typeof body === 'string' || typeof body === 'object') &&
	contentType === 'application/json';

const isFormData = (body, contentType) =>
	((env.isNode && typeof body === 'object') ||
		(env.isBrowser && body instanceof FormData)) &&
	contentType === 'multipart/form-data';

const isFile = body => env.isBrowser && body instanceof Blob;

const isBuffer = body => env.isNode && body instanceof Buffer;

const isStream = body => env.isNode && body instanceof require('stream').Stream;

const isArrayBuffer = body => body instanceof ArrayBuffer;

const isTypeArray = body =>
	body instanceof Int8Array ||
	body instanceof Uint8Array ||
	body instanceof Uint8ClampedArray ||
	body instanceof Int16Array ||
	body instanceof Uint16Array ||
	body instanceof Int32Array ||
	body instanceof Uint32Array ||
	body instanceof Float32Array ||
	body instanceof Float64Array;

const isFormUrlEncoded = (body, contentType) =>
	body instanceof URLSearchParams ||
	(typeof body === 'string' &&
		contentType === 'application/x-www-form-urlencoded');
