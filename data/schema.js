'use strict';

// {
// 	'label': 'Example Menu',
// 	'items': []
// }
const menu = {
	id: 'menu',
	required: ['label', 'items'],
	properties: {
		label: {
			type: 'string'
		},
		items: {
			type: 'array',
			minItems: 1,
			uniqueItems: true,
			items: {
				allOf: [{
					$ref: 'item'
				}]
			},
			additionalItems: false
		}
	},
	additionalProperties: false
};

// {
// 	'label': 'Example Item',
// 	'url': 'http://example.com/',
// 	'submenu': null || menu
// }

const item = {
	id: 'item',
	type: 'object',
	required: ['label', 'url', 'submenu'],
	properties: {
		label: {
			type: 'string',
			minLength: 1
		},
		url: {
			type: 'string',
			 format: 'uri'
		},
		submenu: {
			anyOf: [{
				type: 'null'
			}, {
				$ref: 'menu'
			}]
		}
	},
	additionalProperties: false
};

// {
// 	nameOfMenuObject: menu,
// 	nameOfMenuObject: menu
// }
const root = {
	id: 'root',
	type: 'object',
	minProperties: 1,
	required: ['example-menu'],
	'patternProperties': {
		'^.*$': { $ref: 'menu' }
	},
	additionalProperties: false
};

const Ajv = require('ajv');
const ajv = new Ajv();
ajv.addSchema(menu);
ajv.addSchema(item);
ajv.addSchema(root);

module.exports = ajv;
