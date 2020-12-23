const shelljs = require('shelljs');
const { textRedBright, textCyan, textGreen } = require('../cli-shared-utils/chalk');
// 文件模块
const fs = require('fs');
const path = require('path');
// project json
const __path__ = path.resolve(__dirname, '../cache/local-projects.json');

/**
 * projects 缓存路径
 */
const cachePath = (() => {
  if (fs.existsSync(__path__)) return __path__;

  fs.writeFileSync(__path__, JSON.stringify([]));

  return __path__;
})();

/**
 * projects 缓存数据
 */
const cacheProjects = require(cachePath);

/**
 * project 判空后的数据
 */
const  cacheProjectsValid = () => {
  if (cacheProjects.length < 1) {
    console.log(textRedBright('cache projects is empty,'), 'please `ro add`');
    shelljs.exit(1);
  }

  return cacheProjects;
}

module.exports = {
  cachePath,
  cacheProjects,
  cacheProjectsValid,
};
