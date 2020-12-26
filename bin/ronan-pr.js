#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

const shelljs = require('shelljs');
const spawn = require('../cli-shared-utils/spawn');
// 交互模块
const inquirer = require('inquirer');
const GitPlateform = require('../cli-enums/gitPlateform');
const { textRedBright, textCyan } = require('../cli-shared-utils/chalk');
const { logStep } = require('../cli-shared-utils/logStep');
const { gitBranchCurrent, gitLocalOrigin } = require('../cli-shared-utils/git');

const { cacheProjectsValid } = require('../cli-shared-utils/cache');
const __projects__ = cacheProjectsValid();

(async () => {
  logStep`step1: select project`;
  const { inputVal } = await inquirer.prompt([{
    type: 'list',
    message: 'Which do you want to pr',
    name: 'inputVal',
    choices: [].map.call(__projects__, i => i.localPath),
    pageSize: 2
  }]);

  logStep`step2: check branch`;
  // current git branch
  const res = await gitBranchCurrent(inputVal);
  if (res.code !== 0) throw res.stderr;

  const curLocalBranch = res.stdout;
  const { inputConfirm } = await inquirer.prompt([{
    type: 'confirm',
    message: 'Are u sure the branch: ' + textRedBright(curLocalBranch),
    name: 'inputConfirm'
  }]);

  if (!inputConfirm) return shelljs.exit(1);

  logStep`step3: check git plateform`;
  let url = '';

  const originGit = await gitLocalOrigin(inputVal);
  const existedProject = [].find.call(__projects__, i => i.localPath === inputVal);

  const { gitPlateform, targetRepo } = existedProject;

  if (gitPlateform === GitPlateform.GitLab) {
    url = `${originGit}`.replace('.git', '/merge_requests/new?') + 'merge_request%5Bsource_branch%5D=' + curLocalBranch;
  } else if (gitPlateform === GitPlateform.GitHub) {
    // https://github.com/ronan-try/tying-cli/compare/main...ronliruonan:main
    url = `${targetRepo}`.replace('.git', '/compare/main...' + originGit.replace('https://github.com/', '').replace(/(\/(\S*))/,'') + ':' + curLocalBranch);
  }

  shelljs.exec('start ' + url);
  // end
})();
