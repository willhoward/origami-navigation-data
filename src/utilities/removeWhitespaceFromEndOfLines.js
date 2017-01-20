'use strict';

const trim = require('trim');

function removeTrailingSpaces(file) {
	const normalised = file.split('\n')
		.map(line => trim.right(line))
		.join('\n');
	return normalised;
}

module.exports = removeTrailingSpaces;
