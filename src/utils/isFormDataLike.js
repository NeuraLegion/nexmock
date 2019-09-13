const isObject = require('./isObject');

const isFormDataLike = (body, contentType) =>
	isObject(body) && contentType && contentType.startsWith('multipart/');

module.exports = isFormDataLike;
