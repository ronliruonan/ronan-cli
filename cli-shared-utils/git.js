const shelljs = require('shelljs');

async function existsLocalGit (path) {
  return new Promise(resolve => {
    shelljs.exec(
      'git status',
      { cwd: path, silent: true },
      (code, stdout, stderr) => resolve(code === 0)
    )
  });
}

async function gitCurrentBranch (path) {
  return new Promise(resolve => {
    shelljs.exec(
      'git branch --show-current',
      { cwd: path, silent: true },
      (code, stdout, stderr) => resolve({ code, stdout, stderr })
    )
  });
}

module.exports = {
  existsLocalGit,
  gitCurrentBranch,
};
