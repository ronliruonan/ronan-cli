#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

 const chalk = require('chalk');
 // 交互模块
const inquirer = require('inquirer');
// // 命令行模块
// const { program } = require('commander');
// ora 加载模块
const ora = require('ora');
// 文件操作模块
const fs = require('fs');
const path = require('path');

// project Local path
const localPath = path.resolve(__dirname, '../cache/local-projects.json');
const localProjects = require(localPath); // []

// 定制问答
let questions = [
  {
    type: 'input',
    name: 'inputLocalPath',
    message: 'project local path:',
    validate: (val) => {
      const str = `${val}`.trim();
      if (!str) return 'unexpect local path';
      if ([].find.call(localProjects, i => i.localPath === str)) return 'existed local path';

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
      if (!str) return 'unexpect desc';
      return true;
    }
  }
];

inquirer
  .prompt(questions)
  .then(answers => {
    // 获取问答内容
    const { inputLocalPath, inputDesc } = answers;

    // 更新json
    [].push.call(localProjects, { localPath: inputLocalPath, desc: inputDesc });

    // 加载图标
    const spinner = ora('写入中...');
    spinner.start();

    // 写入文件
    fs.writeFileSync(localPath, JSON.stringify(localProjects));

    setTimeout(() => spinner.succeed('写入 成功'), 1000);
  });
  