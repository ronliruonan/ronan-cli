const shelljs = require('shelljs');
const { ROCLIUPSTREAM } = require('../cli-const/index');

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
 * git remote add upstream git@git.com
 */
const gitRemoteAdd = async (path, targetRepo) => gitShellFactory(path, `git remote add ${ROCLIUPSTREAM} ${targetRepo}`);
/**
 * git remote remove upstream
 */
const gitRemoteRemove = async (path) => gitShellFactory(path, 'git remote remove ' + ROCLIUPSTREAM);
/**
 * git fetch upsteam
 */
const gitFetchRepo = async (path, targetRepo) => gitShellFactory(path, 'git fetch ' + targetRepo);
/**
 * git branch --show-current
 */
const gitBranchCurrent = async (path) => gitShellFactory(path, 'git branch --show-current');
/**
 * git checkout
 */
const gitCheckout = async (path, localBranch, targetBranch) => gitShellFactory(path, `git checkout -b ${localBranch} ${targetBranch}`);

const gitCheckoutSpawn = async (path, localBranch, targetBranch) => new Promise(resolve => {
  const { spawn } = require('child_process');
  const sp = spawn(`git checkout -b ${localBranch} ${targetBranch}`, { cwd: path, shell: true, stdio: 'inherit' });
  sp.on('close', code => {
    resolve({ code });
  });
});

/**
 * git push -u origin branch
 */
const gitPushUOrigin = async (path, branch) => gitShellFactory(path, `git push -u origin ${branch ? branch : ''}`);

/**
 * git branch -r
 */
const gitBranchR = async (path) => gitShellFactory(path, 'git branch -r');
/**
 * git remote -v
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
  gitRemoteRemove,
  gitRemoteAdd,
  gitFetchRepo,
  gitBranchCurrent,
  gitLocalOrigin,
  gitBranchR,
  gitCheckout,
  gitPushUOrigin,
  gitCheckoutSpawn,
};
