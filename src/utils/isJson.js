const isString = require('./isString');
const isObject = require('./isObject');

const isJson = item => {
	item = !isString(item) ? JSON.stringify(item) : item;

	try {
		item = JSON.parse(item);
	} catch (e) {
		return false;
	}

	return isObject(item) && item !== null;
};

module.exports = isJson;
