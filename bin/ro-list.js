#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

const path = require('path');
const cachePath = path.resolve(__dirname, '../cache/local-projects.json');
const cacheProjects = require(cachePath); // []
const { textRedBright } = require('../cli-shared-utils/chalk');

// check array
if (!Array.isArray(cacheProjects)) return console.log(textRedBright('cache projects were wrong'));

console.table(cacheProjects);
