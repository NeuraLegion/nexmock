const zip = entries =>
	entries.reduce((acc, [key, value]) => {
		if (Array.isArray(acc[key])) {
			acc[key] = [...acc[key], value];
		} else if (!!acc[key]) {
			acc[key] = [value];
		} else {
			acc[key] = value;
		}
		return acc;
	}, {});

module.exports = zip;
