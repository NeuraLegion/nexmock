const isObject = require('./isObject');
const isFunction = require('./isFunction');

const isURLSearchParams = value =>
	isObject(value) &&
	isFunction(value.entries) &&
	isFunction(value.append) &&
	isFunction(value.sort) &&
	isFunction(value.getAll) &&
	isFunction(value.constructor) &&
	value.constructor.name === 'URLSearchParams';

module.exports = isURLSearchParams;
