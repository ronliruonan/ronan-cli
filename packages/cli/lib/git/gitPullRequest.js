#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

// 交互模块
const inquirer = require('inquirer');

// 内部依赖
const { GitPlatform } = require('../cli-enums')
const { textRedBright } = require('../cli-shared-utils/chalk');
const { logStep } = require('../cli-shared-utils/logStep');
const { gitBranchCurrent, gitLocalOrigin } = require('../cli-services/git');

(async () => {
  logStep`step1: select project`;
  const { selectedProject } = await require('./inquirers/selectCacheProject')();

  logStep`step2: check branch`;
  let curLocalBranch;
  {
    // current git branch
    const res = await gitBranchCurrent(selectedProject.localPath);
    if (res.code !== 0) throw res.stderr;

    curLocalBranch = res.stdout;

    const { inputConfirm } = await inquirer.prompt([{
      type: 'confirm',
      message: 'Are u sure the branch: ' + textRedBright(curLocalBranch),
      name: 'inputConfirm'
    }]);

    if (!inputConfirm) return process.exit(1);
  }

  logStep`step3: check git plateform`;
  {
    const { gitPlatform, targetRepo } = selectedProject;
    const originGit = await gitLocalOrigin(selectedProject.localPath);
    let url = '';
    if (gitPlatform === GitPlatform.GitLab) {
      url = `${originGit}`.replace('.git', '/merge_requests/new?') + 'merge_request%5Bsource_branch%5D=' + curLocalBranch;
    } else if (gitPlatform === GitPlatform.GitHub) {
      // https://github.com/ronan-try/tying-cli/compare/main...ronliruonan:main
      url = `${targetRepo}`.replace('.git', '/compare/main...' + originGit.replace('https://github.com/', '').replace(/(\/(\S*))/, '') + ':' + curLocalBranch);
    } else if (gitPlatform === GitPlatform.Gitee) {
      url = `${targetRepo}`.replace('.git', '/compare/main...' + originGit.replace('https://gitee.com/', '').replace(/(\/(\S*))/, '') + ':' + curLocalBranch);
    }

    require('../cli-editors/index').openWithBroswer(url);
  }

  // end
})();
