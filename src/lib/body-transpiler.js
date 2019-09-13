const {
	isBuffer,
	isFile,
	isStream,
	isTypedArray,
	isJson,
	isURLSearchParams,
	isFormUrlencoded,
	isJsonLike,
	isFormData,
	isFormDataLike,
	dataUrlToBase64,
	arrayBufferToBase64,
	bufferToBase64,
	zip,
	isString
} = require('../utils');

const MOCK_BODY_TYPE = Object.freeze({
	buffer: 'buffer',
	json: 'json',
	multipart: 'multipart',
	file: 'file',
	stream: 'stream',
	form_urlencoded: 'form_urlencoded',
	text: 'text'
});

module.exports.MOCK_BODY_TYPE = MOCK_BODY_TYPE;

const isComplexType = contentType =>
	contentType &&
	(contentType.startsWith('multipart/') ||
		contentType === 'application/x-www-form-urlencoded');

const transpileValue = (body, contentType, parentContentType) => {
	if (
		!isComplexType(parentContentType) &&
		(isFormDataLike(body, contentType) || isFormData(body))
	) {
		return transpileFormData(body);
	}

	if (
		!isComplexType(parentContentType) &&
		(isFormUrlencoded(body, contentType) || isURLSearchParams(body))
	) {
		return transpileFromUrlencoded(body);
	}

	if (isFile(body)) {
		return transpileBlob(body);
	}

	if (isStream(body)) {
		return transpileStream(body);
	}

	if (isBuffer(body)) {
		return transpileBuffer(body);
	}

	if (isTypedArray(body)) {
		return transpileArrayBuffer(body);
	}

	if (
		!isComplexType(parentContentType) &&
		(isJsonLike(body, contentType) || isJson(body))
	) {
		return transpileJson(body);
	}

	return transpileText(body);
};

module.exports.transpileValue = transpileValue;

const transpileListValues = async body =>
	Promise.all(body.map(value => transpileValue(value)));

const transpileMultiPartItem = value => {
	return Array.isArray(value)
		? transpileListValues(value)
		: transpileValue(value, null, 'multipart/form-data');
};

const transpileJson = async body => ({
	body: isString(body) ? body : JSON.stringify(body),
	type: MOCK_BODY_TYPE.json
});

const transpileFormData = async body => ({
	body: zip(await transpileMultiPartItems(body)),
	type: MOCK_BODY_TYPE.multipart
});

const transpileBlob = body =>
	new Promise(resolve => {
		const reader = new FileReader();
		reader.addEventListener('loadend', () =>
			resolve({
				body: dataUrlToBase64(reader.result),
				mimeType: body.type,
				fileName: body.name,
				type: MOCK_BODY_TYPE.file
			})
		);
		reader.readAsDataURL(body);
	});

const transpileBuffer = async body => ({
	body: bufferToBase64(body),
	type: MOCK_BODY_TYPE.buffer
});

const transpileStream = async body => ({
	body: bufferToBase64(Buffer.from('dummy file')),
	fileName: body.name,
	type: MOCK_BODY_TYPE.stream
});

const transpileFromUrlencoded = async body => ({
	body: zip([...new URLSearchParams(body).entries()]),
	type: MOCK_BODY_TYPE.form_urlencoded
});

const transpileArrayBuffer = async body => ({
	body: arrayBufferToBase64(body),
	type: MOCK_BODY_TYPE.buffer
});

const transpileText = async body => ({ body, type: MOCK_BODY_TYPE.text });

const transpileMultiPartItems = async body =>
	Promise.all(
		[...body.entries()].map(async ([key, value]) => [
			key,
			await transpileMultiPartItem(value)
		])
	);
