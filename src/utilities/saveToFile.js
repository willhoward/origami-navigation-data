'use strict';

const fs = require('fs');
const path = require('path');
const directoryExists = require('./directoryExists');
const createDirectory = require('./createDirectory');

module.exports = function saveToFile(data) {
	const destDir = path.resolve(__dirname, '../../', 'build');

	if (!directoryExists(destDir)) {
		createDirectory(destDir);
	}

	return fs.writeFileSync(path.join(destDir, 'navigation.json'), JSON.stringify(data, null, 4), {
		encoding: 'utf8'
	});
};
