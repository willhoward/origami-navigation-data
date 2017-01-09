'use strict';

const assert = require('proclaim');
const fs = require('fs');

describe('Navigation data', () => {
	const navigationDataPath = __dirname + '/../../build/navigation.json';

	it('exists', () => {
		assert.equal(fs.existsSync(navigationDataPath), true, 'The navigation data file does not exist');
	});

	it('is JSON', () => {
		assert.doesNotThrow(() => {
			JSON.parse(fs.readFileSync(navigationDataPath, 'utf-8'));
		}, null, 'The navigation data is not valid JSON');
	});
});


