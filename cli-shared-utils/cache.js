const shelljs = require('shelljs');
const { textRedBright, textCyan } = require('../cli-shared-utils/chalk');
// 文件模块
const path = require('path');
// project json
const __path__ = path.resolve(__dirname, '../cache/local-projects.json');
const __projects__ = require(__path__); // []

module.exports = {
  cachePath: __path__,
  cacheProjects: __projects__,
  cacheProjectsValid: () => {
    if (__projects__.length < 1) {
      console.log(textRedBright('cache projects is empty,'), 'please `ro add`');
      shelljs.exit(1);
    }

    return __projects__;
  }
};
