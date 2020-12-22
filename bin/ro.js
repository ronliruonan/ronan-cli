#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

 const { program } = require('commander');

program
  .version(`${require('../package.json').version}`)
  .usage('<command> [options]');

program
  .command('flow', 'new a local-repo branch from a target-repo branch')
  .command('add', 'add project local path')
  .command('merge/mr', 'merge request')
  .command('ui', 'ui operation')
  .command('start', 'new terminal to start your project')
  .command('open', 'open a project folder')
  .parse(process.argv);
