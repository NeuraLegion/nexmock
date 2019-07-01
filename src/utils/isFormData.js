const isObject = require('./isObject');
const isFunction = require('./isFunction');

const isFormData = value =>
	isObject(value) &&
	isFunction(value.entries) &&
	isFunction(value.append) &&
	isFunction(value.getAll) &&
	isFunction(value.constructor) &&
	value.constructor.name === 'FormData';

module.exports = isFormData;
