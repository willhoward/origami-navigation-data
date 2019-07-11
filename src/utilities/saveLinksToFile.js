'use strict';

const fs = require('fs-extra');
const path = require('path');

module.exports = function saveToFile(data) {
	const destDir = path.resolve(__dirname, '../../', 'build');

	fs.ensureDirSync(destDir);

	fs.writeJsonSync(path.join(destDir, 'links.json'), data.links, {
		spaces: 4
	});

	return data;
};
