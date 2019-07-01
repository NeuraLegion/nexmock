const bufferToBase64 = require('./bufferToBase64');

const arrayBufferToBase64 = buffer =>
	!!Buffer
		? bufferToBase64(Buffer.from(buffer))
		: btoa(String.fromCharCode(...buffer));

module.exports = arrayBufferToBase64;
