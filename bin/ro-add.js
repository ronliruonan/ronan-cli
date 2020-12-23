#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

// 交互模块
const inquirer = require('inquirer');
// ora 加载模块
const ora = require('ora');
// 文件操作模块
const fs = require('fs');
// git 模块
const { existsLocalGit } = require('../cli-shared-utils/git');
// cache projects
const { cachePath, cacheProjects } = require('../cli-shared-utils/cache');
// asdf
const { textRed } = require('../cli-shared-utils/chalk');

// 定制问答
let questions = [
  {
    type: 'input',
    name: 'inputName',
    message: 'What\'s your project name:',
    validate: (val) => {
      const str = `${val}`.trim();
      if (!str) return 'unexpected project name';
      return true;
    }
  },
  {
    type: 'input',
    name: 'inputPath',
    message: 'What\'s the local path:',
    default: 'D:/GitHub/vue-cli',
    validate: async (val) => {
      const str = `${val}`.trim();

      // 有效输入
      if (!str) return textRed('unexpected local path');
      // Path 已存在
      if ([].find.call(cacheProjects, i => i.localPath === str)) return textRed('has existed local path');
      // Path 无效
      if (!fs.existsSync(str)) return textRed`not existed path`;
      // Path 无Git Repo
      if (!await existsLocalGit(str)) return textRed`not existed git repo`;

      return true;
    }
  },
  {
    type: 'input',
    name: 'inputTargetGit',
    message: 'What\'s the target git repo:',
    validate: (val) => {
      const str = `${val}`.trim();
      if (!str) return 'unexpected git url';
      return true;
    }
  },
  {
    type: 'list',
    message: 'What\'s the git plateform',
    name: 'inputGitPlateform',
    choices: Object.values(require('../cli-enums/gitPlateform')),
    pageSize: 2
  }
];

inquirer
  .prompt(questions)
  .then(answers => {
    // 获取问答内容
    const { inputName, inputPath, inputTargetGit, inputGitPlateform } = answers;

    // 更新json
    [].push.call(cacheProjects, {
      projectName: inputName,
      localPath: inputPath,
      targetRepo: inputTargetGit,
      gitPlateform: inputGitPlateform
    });

    // 加载图标
    const spinner = ora('写入中...');
    spinner.start();

    // 写入文件
    fs.writeFile(cachePath, JSON.stringify(cacheProjects), (err) => {
      if (err) throw err;
      spinner.succeed('写入 成功')
    });
  });
