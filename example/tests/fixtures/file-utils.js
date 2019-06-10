const xmlContent = '<a id="a"><b id="b">hey!</b></a>';
const xml = new Blob([xmlContent], { type: 'text/xml' });

module.exports.xml = xml;
