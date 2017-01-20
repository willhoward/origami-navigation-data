'use strict';

const proclaim = require('proclaim');
const mockery = require('mockery');

describe('directoryExists', () => {
	let directoryExists;
	let fs;

	beforeEach(() => {
		fs = require('../../../mock/fs.mock');
		mockery.registerMock('fs', fs);

		directoryExists = require('../../../../src/utilities/directoryExists');
	});

	it('is a function', () => {
		proclaim.isFunction(directoryExists);
	});

	it('takes a directory location and returns true is directory exists', () => {
		fs.statSync.withArgs('./').returns({});

		proclaim.isTrue(directoryExists('./'));
	});

	it('takes a directory location and returns true is directory exists', () => {
		fs.statSync.withArgs('./').throws('Error');

		proclaim.isFalse(directoryExists('./'));
	});
});


