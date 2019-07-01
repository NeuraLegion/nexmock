const isString = require('./isString');

const isFormUrlencoded = (body, contentType) =>
	isString(body) && contentType === 'application/x-www-form-urlencoded';

module.exports = isFormUrlencoded;
