import { resolve } from 'path';

const packagePath = resolve(__dirname, '../package.json');

export const packagejson = require(packagePath);
