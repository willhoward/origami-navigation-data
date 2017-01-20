'use strict';

const fs = require('fs');

module.exports = function createDirectory(directory) {
	fs.mkdirSync(directory);
};
