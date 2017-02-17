'use strict';

const assert = require('proclaim');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const throat = require('throat')(10);
const heads = require('heads');
const url = require('url');


describe('Navigation data', () => {
	let schema;
	let navigationData;

	beforeEach(() => {
		schema = require('../../data/schema');
		navigationData = require('../../build/navigation');
	});

	it('adheres to navigation schema', () => {
		const valid = schema.validate('root', navigationData);
		assert.isNull(schema.errors, 'The navigation data did not match the scheme:' + JSON.stringify(schema.errors, null, 4));
		assert.equal(valid, true, 'The navigation data did not match the scheme');
	});

	describe('links', () => {

		const linkYaml = yaml.safeLoad(
			fs.readFileSync(
				path.join(__dirname, '../../data/links.yaml'), 'utf8'
			)
		);

		const urls = linkYaml.links.map(link => url.resolve('https://www.ft.com', link.url));


		urls.map(url => {
			throat(() => {
				it(`${url} returns a 200 status code`, () => {
					return heads(url).then(statusCode => assert.equal(statusCode, 200));
				});
			});
		});
	});
});