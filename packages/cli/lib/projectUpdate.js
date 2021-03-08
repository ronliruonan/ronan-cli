#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

// 交互模块
const inquirer = require('inquirer');
// 文件模块
const { textRed } = require('../cli-shared-utils/chalk');

const { cacheProjectsValid, cacheProjectRewrite } = require('../cli-services/cache');
/** cached project */
const __projects__ = cacheProjectsValid();

const { GitPlatform } = require('../cli-enums')

const { logStep } = require('../cli-shared-utils/logStep');
const ora = require('ora');

(async () => {
  logStep`step1: select such project`;
  const { selectedIdx, selectedProject } = await require('./inquirers/selectCacheProject')();

  logStep`step2: update project's config`;
  {
    const questions = Object.entries(selectedProject).map(([key, value]) => {
      if (key === 'gitPlatform') {
        return {
          type: 'list',
          message: 'to update ' + key,
          default: value,
          choices: Object.values(GitPlatform),
          name: key
        };
      }

      return {
        type: 'input',
        message: 'to update ' + key,
        default: value,
        name: key
      };
    });

    const answers = await inquirer.prompt(questions);

    Object.assign(__projects__[selectedIdx], answers);
  }

  logStep`step3: write cache`;
  const spinner = ora('updating the projects cache file');
  spinner.start();
  await cacheProjectRewrite(__projects__);
  spinner.succeed();


  logStep`step4: show the new project`;
  console.table(selectedProject);

  logStep`the end`;
})();
