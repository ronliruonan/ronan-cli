#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

const ora = require('ora');
// 交互模块
const inquirer = require('inquirer');
// 文件模块
const { textRed } = require('../cli-shared-utils/chalk');
const { logStep } = require('../cli-shared-utils/logStep');

// 内部依赖
/** cached project */
const { cacheProjectsValid, cacheProjectRewrite } = require('../cli-services/cache');
const __projects__ = cacheProjectsValid();

(async () => {
  logStep`step1: select such project`;
  const { selectedIdx, selectedProject } = await require('./inquirers/selectCacheProject')();

  logStep`step2: delete the project`;
  {
    console.log();
    console.table(selectedProject);

    const questions = [{
      type: 'confirm',
      message: 'sure to delete the above project',
      default: false,
      name: 'inputSure'
    }];

    const { inputSure } = await inquirer.prompt(questions);
    inputSure && [].splice.call(__projects__, selectedIdx, 1);

    !inputSure && process.exit(1);
  }

  logStep`step3: write cache`;
  const spinner = ora('updating the projects cache file');
  spinner.start();

  await cacheProjectRewrite(__projects__);

  spinner.succeed();


  logStep`step4: show the cache projects`;
  console.table(__projects__);

  logStep`the end`;
})();
