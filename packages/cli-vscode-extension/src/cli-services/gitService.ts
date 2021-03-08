import { showError } from '../utils/showMsg';

const shelljs = require('shelljs');

const ROCLIUPSTREAM = 'ro_cli_upstream';
const ORIGIN = 'origin';
const SPLITCHAR = '~~~~';

/**git shell factory */
async function gitShellFactory (path: string, cmd: string) {
  return new Promise(resolve => {
    shelljs.exec(
      cmd,
      { cwd: path, silent: true },
      ( code: any, stdout: any, stderr: any) => resolve({ code, stdout, stderr })
    );
  });
}
/** git remote add upstream git@git.com */
export const gitRemoteAdd = async (path: string, targetRepo: string) => gitShellFactory(path, `git remote add ${ROCLIUPSTREAM} ${targetRepo}`);

/** git remote remove upstream */
export const gitRemoteRemove = async (path: string) => gitShellFactory(path, 'git remote remove ' + ROCLIUPSTREAM);

/** git fetch upsteam */
export const gitFetchRepo = async (path: string, targetRepo: string) => gitShellFactory(path, 'git fetch ' + targetRepo);
/**
 * git branch --show-current
 */
export const gitBranchCurrent = async (path: string) => gitShellFactory(path, 'git branch --show-current');
/**
 * git checkout -b
 */
export const gitCheckoutB = async (path: string, localBranch: string, targetBranch: string) => gitShellFactory(path, `git checkout -b ${localBranch} ${targetBranch}`);

/**
 * git checkout spawn
 */
export const gitCheckoutSpawn = async (path: string, localBranch: string) => new Promise(resolve => {
  const { spawn } = require('child_process');
  const sp = spawn(`git checkout ${localBranch}`, { cwd: path, shell: true, stdio: 'inherit' });
  sp.on('close', (code: any) => {
    resolve({ code });
  });
});

export const gitCheckoutBSpawn = async (path: string, localBranch: string, targetBranch: string) => new Promise(resolve => {
  const { spawn } = require('child_process');
  const sp = spawn(`git checkout -b ${localBranch} ${targetBranch}`, { cwd: path, shell: true, stdio: 'inherit' });
  sp.on('close', (code: any) => {
    resolve({ code });
  });
});

export const gitMergeTargetToLocal = async (path: string, targetBranch: string) => new Promise(resolve => {
  const { spawn } = require('child_process');
  const sp = spawn(`git merge ${targetBranch}`, { cwd: path, shell: true, stdio: 'inherit' });
  sp.on('close', (code: any) => {
    resolve({ code });
  });
});

/** git push -u origin branch */
export const gitPushUOrigin = async (path: string, branch: string) => gitShellFactory(path, `git push -u origin ${branch ? branch : ''}`);

export const gitPushOrigin = async (path: string, branch: string) => gitShellFactory(path, `git push origin ${branch}`);

export const gitAddAll = async (path: string) => gitShellFactory(path, `git add .`);
/**
 * gitAddAll
 * git commit --amend 可以修改上次的commit mes
 */
export const gitCommitM = async (path: string, mgs: string) => gitShellFactory(path, `git commit -m ${mgs}`);

/** git branch -r */
export const gitBranchR = async (path: string) => gitShellFactory(path, 'git branch -r');

/** git branch  */
export const gitBranchLocal = async (path: string) => gitShellFactory(path, 'git branch');

/** git remote -v */
export const gitRemoteV = async (path: string) => gitShellFactory(path, 'git remote -v');

/** 返回本地origin */
export async function gitLocalOrigin (path: string) {
  const resOrigin = (await gitRemoteV(path)) as any;

  if(resOrigin.code !== 0) {
    showError(resOrigin.stderr);
    throw resOrigin.stderr;
  }

  const originGit = resOrigin.stdout.split(' ')[0].split('\t')[1];
  return originGit;
}

/**
 * 路径是否存在git repo
 */
export async function existsLocalGit (path: string) {
  return new Promise(resolve => {
    shelljs.exec(
      'git status',
      { cwd: path, silent: true },
      ( code: any, stdout: any, stderr: any) => resolve(code === 0)
    );
  });
}
