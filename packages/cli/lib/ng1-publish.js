#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

const shelljs = require('shelljs');
const ora = require('ora');
// 交互模块
const inquirer = require('inquirer');
const { program } = require('commander');
// 文件模块
const { textCyan, textYellow, textGreen, textRedBright, textRed, } = require('../cli-shared-utils/chalk');
const { logStep } = require('../cli-shared-utils/logStep');
const {
  gitBranchR,
  gitBranchLocal,
  gitLocalOrigin,
  gitRemoteAdd,
  gitFetchRepo,
  gitRemoteRemove,
  gitCheckoutSpawn,
  gitMergeTargetToLocal,
  gitAddAll,
  gitCommitM,
  gitPushOrigin,
} = require('../cli-services/git');

const { ConstName } = require('../cli-enums');
const { ROCLIUPSTREAM } = ConstName;

(async () => {
  console.log(textRedBright('Note: 仅用于价格系统ng1的os发布平台'));

  program
    .option('-t, --test', 'merge feature to test, build, push test')
    .option('-m, --master', 'merge feature to master, build, push master')
    .parse(process.argv);

  if (!('test' in program) && !('master' in program)) {
    console.log(textRed('没有接收到options'));
    
    console.log();
    shelljs.exec('ro ng1 --help');
    process.exit(1);
  }

  let TargetBranch = 'test';
  program.master && (TargetBranch = 'master');

  logStep`step1: select ng1 project`;
  const { selectedProject } = await require('./inquirers/selectCacheProject')();
  const workspacePath = selectedProject.localPath;

  logStep`step2: confirm feature branch`;
  let localFeatureBranch;
  {
    const res = await gitBranchLocal(workspacePath);;
    if (res.code !== 0) {
      spinner.fail(res.stderr);
      throw res.stderr && shelljs.exit(1);
    }

    const LocalBranches = [];
    [].push.apply(LocalBranches, res.stdout.split('\n').map(i => i.trim()));

    const { inputLocalBranch } = await inquirer.prompt([
      {
        type: 'list',
        message: 'Which local branch: ',
        name: 'inputLocalBranch',
        choices: LocalBranches,
      },
    ]);

    localFeatureBranch = ''.replace.call(inputLocalBranch, '*', '');
  }

  logStep`step3: checkout ${TargetBranch} branch`;
  {
    const res = await gitCheckoutSpawn(workspacePath, TargetBranch);
    if (res.code !== 0) {
      throw res.stderr && process.exit(1);
    }
  }

  const spinnerFetch = ora('git merge feature branch');
  spinnerFetch.start();

  logStep`step4: git merge`;
  {
    const res = await gitMergeTargetToLocal(workspacePath, localFeatureBranch);
    if (res.code !== 0) {
      spinnerFetch.fail();
      console.log(textRed(res.stderr));

      logStep`你可以使用'git reset HEAD'来取消本次merge的暂存文件`;
      process.exit(1);
    }
  }

  spinnerFetch.succeed();

  logStep`step5: npm run build`;
  {
    const res = await require('../cli-shared-utils/asyncExec')(workspacePath, 'npm run build');
    if (res.code !== 0) {
      throw res.stderr && process.exit(1);
    }
  }

  logStep`step6: git push msg`;
  let gitMsg;
  {
    const questions = [{
      type: 'input',
      message: 'Your build msg:',
      name: 'inputMsg',
      default: 'build:',
      validate: (val) => {
        const str = `${val}`.trim();
        if (!str) return 'must required';

        return true;
      }
    }];
    const { inputMsg } = await inquirer.prompt(questions);
    gitMsg = inputMsg;
  }

  const spinnerGit = ora('git operating');
  spinnerGit.start();
  logStep`step6: git add . `;
  {
    const res =  await gitAddAll(workspacePath);
    if (res.code !== 0) {
      throw res.stderr && process.exit(1);
    }
  }
  logStep`step6: git commit -m `;
  {
    const res =  await gitCommitM(workspacePath, `build(${TargetBranch}):` + `"${gitMsg}"`);
    console.log(res);
    if (res.code !== 0) {
      throw res.stderr;
    }
  }
  logStep`step6: git push origin `;
  {
    const res =  await gitPushOrigin(workspacePath, TargetBranch);
    if (res.code !== 0) {
      throw res.stderr && process.exit(1);
    }
  }

  spinnerGit.succeed();

  require('../cli-lib/inquirers/openWithVSCode')(selectedProject.localPath);

  // end
})();
