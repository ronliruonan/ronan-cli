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
   .command('add')
   .description(`add project's local path`)
   .action(() => require('../cli-lib/addProject'));
 
 program
   .command('list')
   .description('table the cached projects')
   .action(() => require('../cli-lib/ro-list'));
 
 program
   .command('delete')
   .description(`delete project's local path`)
   .action(() => require('../cli-lib/deleteProject'));
 
 program
   .command('update')
   .description(`update such project's config`)
   .action(() => require('../cli-lib/ro-update'));
 
 program
   .command('fork')
   .description('new a local-repo branch from a target-repo branch')
   .action(() => require('../cli-lib/gitFork'));
 
 program
   .command('sync')
   .description('sync the target branch to local branch')
   .action(() => require('../cli-lib/ro-sync'));
 
 program
   .command('pr')
   .description('make a pr to target-repo')
   .action(() => require('../cli-lib/ro-pr'));
 
 program
   .command('mr')
   .description('make a pr to target-repo')
   .action(() => require('../cli-lib/ro-pr'));
 
 program
   .command('start')
   .description('new terminal to start your project')
   .action(() => require('../cli-lib/ro-start'));
 
 program
   .command('open')
   .description('open a project folder/vs code')
   .option('-fd, --folder', 'open with folder')
   .option('-vs, --vscode', 'open with vscode')
   .action(() => require('../cli-lib/ro-open'));
 
 program
   .command('diff <file-0> <file-1>', 'Compare two files with each other.');
 
 
 program
   .command('ui')
   .description('ui operation')
   .action(() => require('../cli-lib/ro-ui'));
 
 program
   .command('ng1')
   .description('价格系统ng1，发布test/master分支')
   .option('-t, --test', 'merge feature to test, build, push test')
   .option('-m, --master', 'merge feature to master, build, push master')
   .action(() => require('../cli-lib/ro-ng1'))
 
 program.parse(process.argv);
 