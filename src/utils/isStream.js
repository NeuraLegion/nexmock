const isObject = require('./isObject');
const isFunction = require('./isFunction');

const isStream = value =>
	isObject(value) &&
	isFunction(value.pipe) &&
	isFunction(value.read) &&
	value.readable;

module.exports = isStream;
