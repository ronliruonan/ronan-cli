#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

const { cacheProjectsValid } = require('../cli-shared-utils/cache');

console.table(cacheProjectsValid());
