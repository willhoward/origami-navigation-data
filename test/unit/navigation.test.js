'use strict';

const assert = require('proclaim');
const fs = require('fs');

describe('Navigation data', () => {
	let navigationDataPath = __dirname + '/../../data/navigation.json';

	it('exists', () => {
		proclaim.equal(fs.existsSync(navigationDataPath), true, "The navigation data file does not exist");
	});

	it('is JSON', () => {
		proclaim.doesNotThrow(() => {
			JSON.parse(fs.readFileSync(navigationDataPath, 'utf-8'))
		}, null, "The navigation data is not valid JSON");
	});
});


