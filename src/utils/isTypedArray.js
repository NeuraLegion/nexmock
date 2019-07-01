const isTypedArray = body =>
	body instanceof Int8Array ||
	body instanceof Uint8Array ||
	body instanceof Uint8ClampedArray ||
	body instanceof Int16Array ||
	body instanceof Uint16Array ||
	body instanceof Int32Array ||
	body instanceof Uint32Array ||
	body instanceof Float32Array ||
	body instanceof Float64Array ||
	body instanceof ArrayBuffer;

module.exports = isTypedArray;
