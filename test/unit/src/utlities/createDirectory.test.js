'use strict';

const proclaim = require('proclaim');
const mockery = require('mockery');

describe('createDirectory', () => {
	let createDirectory;
	let fs;

	beforeEach(() => {
		fs = require('../../../mock/fs.mock');
		mockery.registerMock('fs', fs);

		createDirectory = require('../../../../src/utilities/createDirectory');
	});

	it('is a function', () => {
		proclaim.isFunction(createDirectory);
	});

	it('takes a directory location and creates that directory', () => {
		createDirectory('./directory-name');

		proclaim.isTrue(fs.mkdirSync.calledWith('./directory-name'));
	});
});


