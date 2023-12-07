import Fs from 'fs';

const Package = JSON.parse(
	Fs.readFileSync(new URL('../package.json', import.meta.url)),
);

const name = Package.name
	.split(/[@/-]/)
	.reduce((comps, comp) => (comp !== '' ? [...comps, comp] : comps), [])
	.join('-');
console.log(name);