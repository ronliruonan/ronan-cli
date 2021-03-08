// 文件模块
const fs = require('fs');
const path = require('path');
// others
const shelljs = require('shelljs');
const { textRedBright } = require('@ro/cli-shared-utils');

/** 得到缓存文件路径 */
function cachePath (checkingPath) {
  if (fs.existsSync(checkingPath)) return checkingPath;

  fs.writeFileSync(checkingPath, JSON.stringify([]));
  return checkingPath;
}

/** 得到缓存文件数据 */
function cacheData (checkingPath) {
  const _path_ = cachePath(checkingPath);
  return require(_path_);
}

/** 判断数据是否为空 */
function validCacheData (_data_) {
  if (!Array.isArray(_data_)) {
    console.log(textRedBright('cache data is not array,'), 'please `check`');
    shelljs.exit(1);
  }

  if (_data_.length < 1) {
    console.log(textRedBright('cache data is empty,'), 'please `add`');
    shelljs.exit(1);
  }

  return _data_;
}

// const cacheProjectsPath = cachePath('./local-projects.hidden.json');
// const cacheProjectsRaw = cacheData(cacheProjectsPath);
// const cacheProjectsValid = validCacheData(cacheProjectsRaw);

// module.exports = {
//   cacheProjectsPath,
//   cacheProjectsRaw,
//   cacheProjectsValid,
// };

[
  'localProjects.hidden.json',
].forEach(fileName => {
  const name = fileName.split('.')[0];

  const obj = Object.create(null);
  const _path_ = cachePath('./' + fileName);
  const _raw_ = cacheData(_path_);
  const _valid_ = validCacheData(_raw_);

  obj['cache' + name + 'Path'] = _path_;
  obj['cache' + name + 'Raw'] = _raw_;
  obj['cache' + name + 'Valid'] = _valid_;
  Object.assign(exports, obj);
});
