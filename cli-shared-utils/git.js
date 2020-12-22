const shelljs = require('shelljs');

async function gitShellFactory (path, cmd) {
  return new Promise(resolve => {
    shelljs.exec(
      cmd,
      { cwd: path, silent: true },
      (code, stdout, stderr) => resolve({ code, stdout, stderr })
    )
  });
}

async function existsLocalGit (path) {
  return new Promise(resolve => {
    shelljs.exec(
      'git status',
      { cwd: path, silent: true },
      (code, stdout, stderr) => resolve(code === 0)
    )
  });
}

module.exports = {
  existsLocalGit,
  gitCurrentBranch: async (path) => gitShellFactory(path, 'git branch --show-current'),
  gitLocalOrigin: async (path) => gitShellFactory(path, 'git remote -v'),
};
