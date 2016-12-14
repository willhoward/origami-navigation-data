'use strict';

const assert = require('proclaim');

describe('Navigation data', () => {
	let v;
	let d;

	beforeEach(() => {
		v = require('../../data/schema');
		d = require('../../data/navigation');
	});

	it('adheres to navigation schema', () => {
		const valid = v.validate('root', d);
		proclaim.isNull(v.errors, "The navigation data did not match the scheme");
		proclaim.equal(valid, true, "The navigation data did not match the scheme");
	});
});


