const { stderr } = require('chalk');
const shelljs = require('shelljs');

async function existsGit (path) {
  return new Promise(resolve => {
    shelljs.exec(
      'git status',
      { cwd: path, silent: true },
      (code, stdout, stderr) => resolve(code === 0)
    )
  });
}

module.exports = {
  existsGit,
};
