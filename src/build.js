'use strict';

const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const yamlFiles = [
	'data/links.yaml',
	'data/navigation.yaml'
];

function readFiles () {
	const yamlStrings = yamlFiles.map(file => fs.readFileSync(file, 'utf8'));
	const combinedYamlStrings = yamlStrings.join('\n');
	return combinedYamlStrings;
}

function yamlToJSON (yamlString) {
	const source = yaml.safeLoad(yamlString);
	delete source.links;
	return source;
}

function saveToFile (data) {
	const destDir = path.resolve(__dirname, '../', 'build');
	try {
		fs.statSync(destDir);
	} catch (e) {
		fs.mkdirSync(destDir);
	}

	return fs.writeFileSync(path.join(destDir, 'navigation.json'), JSON.stringify(data, null, 4), {encoding:'utf8'});
}

Promise.resolve()
.then(readFiles)
.then(yamlToJSON)
.then(saveToFile)
.catch(err => {
	console.error(err.stack);
	process.exit(1);
});
