const isObject = require('./isObject');

const isFormDataLike = (body, contentType) =>
	isObject(body) && contentType === 'multipart/form-data';

module.exports = isFormDataLike;
