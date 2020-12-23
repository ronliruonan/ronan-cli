const shelljs = require('shelljs');

/**
 * 普通git 命令
 */
async function gitShellFactory (path, cmd) {
  return new Promise(resolve => {
    shelljs.exec(
      cmd,
      { cwd: path, silent: true },
      (code, stdout, stderr) => resolve({ code, stdout, stderr })
    )
  });
}
/**
 * 查看当前分支
 */
const gitCurrentBranch = async (path) => gitShellFactory(path, 'git branch --show-current');
/**
 * 查看 git remote
 */
const gitRemoteV = async (path) => gitShellFactory(path, 'git remote -v');
/**
 * 返回本地origin
 */
async function gitLocalOrigin (path) {
  const resOrigin = await gitRemoteV(path);
  if (resOrigin.code !== 0) throw resOrigin.stderr;

  const originGit = resOrigin.stdout.split(' ')[0].split('\t')[1];
  return originGit;
}

/**
 * 路径是否存在git repo
 */
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
  gitRemoteV,
  gitCurrentBranch,
  gitLocalOrigin,
};
