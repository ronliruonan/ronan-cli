import * as vscode from 'vscode';
// serive
import { gitLocalOrigin, gitRemoteV, gitBranchCurrent } from '../cli-services/gitService';
// utils
import { showError, showInfo, showWarning } from '../utils/showMsg';

export default async function helloWorld (context: vscode.ExtensionContext) {
  const folders = vscode.workspace.workspaceFolders;
  if (!Array.isArray(folders)) {
    showWarning('unexpect: ', JSON.stringify(folders));
    return;
  }
  if (folders.length < 1) {
    showWarning('没找到工作区');
    return;
  }

  const curFolder = folders[0];
  const curPath = curFolder.uri.fsPath;

  try {
    const { stdout } = await gitBranchCurrent(curPath) as any;
    const curBranchName = (stdout + '').trim();

    const res = await gitLocalOrigin(curPath);
    const url = `${res}`.replace('.git', '/merge_requests/new?') + 'merge_request%5Bsource_branch%5D=' + curBranchName;

    require('shelljs')
      .exec('start ' + url, (code: number, stdout: any, stderr: any) => {
        if (code === 0) {
          showInfo('Ro: mr/pr', ' url 已经在Browser打开');
        } else {
          showError('Ro: mr/pr', stderr);
        }
        console.log(code, stdout, stderr);
      });
  } catch (error) {
    console.log(error);
  }
}
