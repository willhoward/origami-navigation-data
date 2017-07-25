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

	fs.writeFileSync(path.join(destDir, 'links.json'), JSON.stringify(data.links, null, 4), {
		encoding: 'utf8'
	});
	return data;
};
