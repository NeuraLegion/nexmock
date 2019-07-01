const isString = require('./isString');

const isJsonLike = (body, contentType) =>
	isString(body) && contentType === 'application/json';

module.exports = isJsonLike;
