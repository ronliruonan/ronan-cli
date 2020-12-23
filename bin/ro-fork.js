#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

const shelljs = require('shelljs');
const spawn = require('../cli-shared-utils/spawn');
const ora = require('ora');
// 交互模块
const inquirer = require('inquirer');
// 文件模块
const { textRedBright, textCyan, textYellow, textGreen, textGray } = require('../cli-shared-utils/chalk');
const { logStep } = require('../cli-shared-utils/logStep');
const {
  gitBranchR,
  gitLocalOrigin,
  gitRemoteAdd,
  gitFetchRepo,
  gitRemoteRemove,
  gitCheckout,
  gitPushUOrigin,
  gitCheckoutSpawn,
} = require('../cli-shared-utils/git');

const { cacheProjectsValid } = require('../cli-shared-utils/cache');
const { ROCLIUPSTREAM } = require('../cli-const/index');

(async () => {
  const __projects__ = cacheProjectsValid();

  logStep`step1: select project`;
  const { inputLocalPath } = await inquirer.prompt([{
    type: 'list',
    message: 'Which project do you want',
    name: 'inputLocalPath',
    choices: [].map.call(cacheProjectsValid(), i => i.localPath),
    pageSize: 2
  }]);

  // 本地仓库git repo
  const personalRepo = await gitLocalOrigin(inputLocalPath);
  const targetRepo = [].find.call(__projects__, i => i.localPath === inputLocalPath).targetRepo;

  logStep`step2: user check repos`;
  const { inputIsPersonal, inputIsTarget } = await inquirer.prompt([
    {
      type: 'confirm',
      message: 'Is personal repo: ' + textCyan(personalRepo),
      name: 'inputIsPersonal'
    },
    {
      type: 'confirm',
      message: 'Is target repo: ' + textCyan(targetRepo),
      name: 'inputIsTarget'
    }
  ]);

  if (!(inputIsPersonal && inputIsTarget)) {
    console.log();
    console.log(textYellow('repo 存在质疑，可通过\'ro update\' 更新'));
    shelljs.exit(1);
  }

  logStep`step3: add upstream`;
  // 加载图标
  const spinner = ora('add && fetch target repo...');
  spinner.start();

  {
    await gitRemoteRemove(inputLocalPath);
    const res = await gitRemoteAdd(inputLocalPath, targetRepo);
    if (res.code !== 0 && !res.stderr.includes('already exists')) {
      spinner.fail(res.stderr);
      throw res.stderr && shelljs.exit(1);
    }

    console.log();
    console.log(textCyan('successfully added target repo'));
  }

  logStep`step4: fetch upstream`
  {
    const res = await gitFetchRepo(inputLocalPath, ROCLIUPSTREAM);
    if (res.code !== 0) {
      spinner.fail(res.stderr);
      throw res.stderr && shelljs.exit(1);
    }
  }

  const TargetBranches = [];
  {
    const res = await gitBranchR(inputLocalPath);
    if (res.code !== 0) {
      spinner.fail(res.stderr);
      throw res.stderr && shelljs.exit(1);
    }

    [].push.apply(TargetBranches, res.stdout.split('\n').map(i => i.trim()).filter(i => i.includes(ROCLIUPSTREAM)));

    console.log();
    TargetBranches.forEach(i => console.log(textGreen(i)));
  }

  spinner.succeed('git fetch successfully');

  logStep`step6: select to fork`;
  const { inputTargetBranch, inputLocalBranch } = await inquirer.prompt([
    {
      type: 'list',
      message: 'Which target branches: ',
      name: 'inputTargetBranch',
      choices: TargetBranches,
      pageSize: 2
    },
    {
      type: 'input',
      message: 'What\'s local branch name: ',
      name: 'inputLocalBranch',
      validate: (val) => {
        const str = `${val}`.trim();
        if (!str) return 'must required';

        return true;
      }
    }
  ]);

  logStep`step7: flowing`;
  const spinnerFlow = ora('flowing...');
  spinnerFlow.start();

  {
    const res = await gitCheckoutSpawn(inputLocalPath, inputLocalBranch, inputTargetBranch);
    if (res.code !== 0) {
      logStep`step: git chekcout error`;
      shelljs.exit(1);
    }
  }

  try {
    await gitRemoteRemove(inputLocalPath);
  } catch {
    // to do
  }

  {
    const res = await gitPushUOrigin(inputLocalPath);

    if (res.code !== 0) {
      throw res.stderr && shelljs.exit(1);
    }
  }

  spinnerFlow.succeed('successfully flow');

  const { inputYeah } = await inquirer.prompt([
    {
      type: 'confirm',
      message: 'open vscode now:',
      name: 'inputYeah'
    }
  ]);

  inputYeah === false && shelljs.exit(1);

  shelljs.exec('code ' + inputLocalPath);

  // end
})();
