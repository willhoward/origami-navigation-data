'use strict';

const assert = require('proclaim');

describe('Schema', () => {
	let schema;

	beforeEach(() => {
		schema = require('../../data/schema');
	});

	it('has a validate function', () => {
		proclaim.isFunction(schema.validate);
	});

	it('has an errors property', () => {
		proclaim.isDefined(schema.errors);
	});
});


