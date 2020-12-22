#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

const chalk = require('chalk');
const shelljs = require('shelljs');
// 交互模块
const inquirer = require('inquirer');
// 命令行模块
// const { program } = require('commander');
// ora 加载模块
const ora = require('ora');
// 文件操作模块
const fs = require('fs');
const path = require('path');
// git 模块
const { existsGit } = require('../cli-shared-utils/git');
const cd = require('../cli-shared-utils/cd');
// cache projects
const cachePath = path.resolve(__dirname, '../cache/local-projects.json');
const cacheProjects = require(cachePath); // []
// asdf
const { textRed, textCyanBright, textGreen, textCyan, textRedBright } = require('../cli-shared-utils/chalk');
const { resolve } = require('path');

// 定制问答
let questions = [
  {
    type: 'input',
    name: 'inputPath',
    message: 'project local path:',
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
      if (!await existsGit(str)) return textRed`not existed git repo`;
      
      return true;
    }
  },
  {
    type: 'input',
    name: 'inputDesc',
    default: 'nothing',
    message: 'project desc:',
    validate: (val) => {
      const str = `${val}`.trim();
      if (!str) return 'unexpected desc';
      return true;
    }
  }
];

inquirer
  .prompt(questions)
  .then(answers => {
    // 获取问答内容
    const { inputPath, inputDesc } = answers;

    // 更新json
    [].push.call(cacheProjects, { localPath: inputPath, desc: inputDesc });

    // 加载图标
    const spinner = ora('写入中...');
    spinner.start();

    // 写入文件
    fs.writeFile(cachePath, JSON.stringify(cacheProjects), (err) => {
      if (err) throw err;
      spinner.succeed('写入 成功')
    });

    // setTimeout(() => spinner.succeed('写入 成功'), 1000);
  });
