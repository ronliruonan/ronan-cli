#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

const spawn = require('../cli-shared-utils/spawn');
// 交互模块
const inquirer = require('inquirer');
const { cacheProjectsValid } = require('../cli-shared-utils/cache');

(async () => {
  const { inputVal } = await inquirer.prompt([{
    type: 'list',
    message: 'What do you want to open',
    name: 'inputVal',
    choices: [].map.call(cacheProjectsValid(), i => i.localPath),
    pageSize: 2
  }]);

  spawn('start .', inputVal);
  // end
})();
