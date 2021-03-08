#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

// 交互模块
const { program } = require('commander');

// 内部依赖
const { logStep } = require('../cli-shared-utils/logStep');
const { openWithVsCode, openWithFolder } = require('../cli-editors/index');

(async () => {
  program
    .option('-fd, --folder', 'open with folder')
    .option('-vs, --vscode', 'open with vscode');
  program.parse(process.argv);

  logStep`step1: select project`;
  const { selectedProject } = await require('./inquirers/selectCacheProject')();

  logStep`step2: to open`;

  function toOpen () {
    return program.folder ? openWithFolder : openWithVsCode;
  }

  toOpen()(selectedProject.localPath);

  // end
})();
