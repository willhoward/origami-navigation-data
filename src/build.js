'use strict';

const removeTrailingSpaces = require('./utilities/removeWhitespaceFromEndOfLines');
const readAndConcatFiles = require('./utilities/readAndConcatFiles');
const removeLinksFromObject = require('./utilities/removeLinksFromObj');
const yamlToJSON = require('./utilities/yamlToJSON');
const saveToFile = require('./utilities/saveToFile');

module.exports = function (files) {
	return Promise.resolve(files)
		.then(readAndConcatFiles)
		.then(removeTrailingSpaces)
		.then(yamlToJSON)
		.then(removeLinksFromObject)
		.then(saveToFile);
};
