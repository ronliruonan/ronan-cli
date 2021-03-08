// 内部资源
const Win32 = require('./lib/win32');
const Darwin = require('./lib/darwin');
const Linux = require('./lib/linux');
// 外部资源
const shelljs = require('shelljs');
const { OSPlatform } = require('../cli-enums');
const { textRed } = require('../cli-shared-utils/chalk');

function openWithVsCode (fullPathProject) {
  const platform = require('os').platform();
  if (platform === OSPlatform.Darwin) {
    return Darwin.openWithVsCode(fullPathProject);
  } else if (platform === OSPlatform.Win32) {
    return shelljs.exec(Win32.openWithVsCode(fullPathProject));
  } else if (platform === OSPlatform.Linux) {
    return shelljs.exec(Linux.openWithVsCode(fullPathProject));
  }

  throw textRed('unexpected os platform');
}

function openWithFolder (fullPathProject) {
  const platform = require('os').platform();
  if (platform === OSPlatform.Darwin) {
    return shelljs.exec(Darwin.openWithFinder(fullPathProject));
  } else if (platform === OSPlatform.Win32) {
    return shelljs.exec(Win32.openWithFolder(fullPathProject));
  } else if (platform === OSPlatform.Linux) {
    return shelljs.exec(Linux.openWithFolder(fullPathProject));
  }

  throw textRed('unexpected os platform');
}

function openWithBroswer (url) {
  const platform = require('os').platform();
  if (platform === OSPlatform.Darwin) {
    return shelljs.exec(Darwin.openWithBroswer(url));
  } else if (platform === OSPlatform.Win32) {
    return shelljs.exec(Win32.openWithBroswer(url));
  } else if (platform === OSPlatform.Linux) {
    return shelljs.exec(Linux.openWithBroswer(url));
  }

  throw textRed('unexpected os platform');
}

module.exports = { openWithVsCode, openWithFolder, openWithBroswer };
