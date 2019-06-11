function b64toBlob(b64Data, contentType = '', sliceSize = 512) {
	const byteCharacters = atob(b64Data);
	const byteArrays = [];

	for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		const slice = byteCharacters.slice(offset, offset + sliceSize);

		const byteNumbers = new Array(slice.length);
		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		const byteArray = new Uint8Array(byteNumbers);
		byteArrays.push(byteArray);
	}

	return new Blob(byteArrays, { type: contentType });
}

module.exports.b64toBlob = b64toBlob;

const pngInBase64 =
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAL1JREFUOI2l0jFqAkEYBeAPEyRgIwFbG0EiqeysvIU38ACBdLlCriAeIU2w9hwSsPEIKsgWJsWyMLvOyCx58Jo3/3vD//j5Jx7uvL3gDQsU2LcJHuOM34DfbQI+GuaKk+ZgJxHwlNAfcwN+IloR01MBw4jWxXNi/gYjnNT33+SaK6wbAfO2AbPAHOsE6Q4ob6HCAP3cn6dYKVsPVzjg3Z0ie/gSP6CQRyxjAZ8Z5opXvFK/rC12uXvi0mI2jT886zqcaw8cNQAAAABJRU5ErkJggg==';

module.exports.pngInBase64 = pngInBase64;
