const shelljs = require('shelljs');
const chalk = require('chalk');

module.exports = (path) => shelljs.cd(path);
