#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

const { cacheProjectsValid } = require('../cli-services/cache');
const { textGray, textGreen } = require('../cli-shared-utils/chalk');

const __projects__ = cacheProjectsValid();
console.table(__projects__);

function logProject (i) {
  console.log();
  console.log(textGreen(i.projectName), ':', i.localPath);
  console.log(textGray(i.gitPlatform), ':', textGray(i.targetRepo));
}
[].forEach.call(__projects__, (i) => {
  logProject(i);
});

