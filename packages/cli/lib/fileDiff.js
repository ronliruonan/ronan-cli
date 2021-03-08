#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

const shelljs = require('shelljs');
// 交互模块
const { program } = require('commander');
const { textRed } = require('../cli-shared-utils/chalk');

// program
//   .option('<file> <file>', 'open with vscode');

program
  .command('<file-0> <file-1>', 'Compare two files with each other.');
program.parse(process.argv);

const { file0, file1 } = program;
console.log(file0, file1);

// if (!(file0 && file1)) {
//   console.log(textRed('such file is wrong'));
//   shelljs.exit(1);
// }

// shelljs.exec(`code -d ${file0} ${file1}`);
