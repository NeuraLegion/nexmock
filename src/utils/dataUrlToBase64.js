const dataUrlToBase64 = dataUrl => dataUrl.replace(/^data:.+\/.+;base64,/, '');

module.exports = dataUrlToBase64;
