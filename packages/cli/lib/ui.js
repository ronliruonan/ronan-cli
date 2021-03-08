#!/usr/bin/env node
/**
 * 以上code，
 * mac下有效，声明当前文件 使用哪种解析器
 * win下无效，win自动根据文件类型调用解析器
 */

const spawn = require('../cli-shared-utils/spawn');
const { resolve } = require('path');

(async () => {
  spawn('node ' + resolve(__dirname, '../cli-services/ws.js'));
  spawn('node ' + resolve(__dirname, '../cli-services/ui.js'));
  // end
})();
