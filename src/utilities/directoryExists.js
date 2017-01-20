'use strict';

const fs = require('fs');

module.exports = function directoryExists(directory) {
	try {
		fs.statSync(directory);
		return true;
	} catch (e) {
		return false;
	}
};
