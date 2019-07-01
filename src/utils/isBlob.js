const isFunction = require('./isFunction');
const isString = require('./isString');
const isObject = require('./isObject');

const names = ['Blob', 'File'];

const isBlob = value =>
	isObject(value) &&
	isString(value.type) &&
	isFunction(value.slice) &&
	isFunction(value.constructor) &&
	names.includes(value.constructor.name) &&
	'size' in value;

module.exports = isBlob;
