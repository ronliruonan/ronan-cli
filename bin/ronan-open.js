#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

const spawn = require('../cli-shared-utils/spawn');
const shelljs = require('shelljs');
// 交互模块
const inquirer = require('inquirer');
const __projects__ = require('../cli-shared-utils/cache').cacheProjectsValid();
const { program } = require('commander');

(async () => {
  program
    .option('-fd, --folder', 'open with folder')
    .option('-vs, --vscode', 'open with vscode');
  program.parse(process.argv);

  const { inputLocalPath } = await inquirer.prompt([{
    type: 'list',
    message: 'What do you want to open',
    name: 'inputLocalPath',
    choices: [].map.call(__projects__, i => i.localPath),
  }]);

  if (program.vscode) {
    // spawn('code ' + inputLocalPath);
    shelljs.exec('code ' + inputLocalPath);
    // new method
    // shelljs.exec('code .', { cwd: inputLocalPath });
    return;
  }

  // spawn('start .', inputLocalPath);
  shelljs.exec('start .' + inputLocalPath);
  // end
})();
