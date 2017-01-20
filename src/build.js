'use strict';

const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const trim = require('trim');

function removeTrailingSpaces(file) {
	const normalised = file.split('\n')
		.map(line => trim.right(line))
		.join('\n');
	return normalised;
}

function readFiles(files) {
	const strings = files.map(file => {
		const contents = fs.readFileSync(file, 'utf8');
		return removeTrailingSpaces(contents);
	});
	return strings.join('\n');
}

function yamlToJSON(yamlString) {
	const source = yaml.safeLoad(yamlString);
	delete source.links;
	return source;
}

function saveToFile(data) {
	const destDir = path.resolve(__dirname, '../', 'build');
	try {
		fs.statSync(destDir);
	} catch (e) {
		fs.mkdirSync(destDir);
	}

	return fs.writeFileSync(path.join(destDir, 'navigation.json'), JSON.stringify(data, null, 4), {
		encoding: 'utf8'
	});
}

module.exports = function (files) {
	return Promise.resolve(files)
		.then(readFiles)
		.then(yamlToJSON)
		.then(saveToFile);
};
