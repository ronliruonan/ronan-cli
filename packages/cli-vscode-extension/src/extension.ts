// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import cmdsRegister from './cmds/index';

// 每次执行扩展命令时，都会触发activate()函数
// 注册命令的实质是：
// 1. 只要运行过vscode.commands.regesterCommand即为注册成功
// 2. context.subscriptoins.push(...) 为了监听&释放一些不用的功能随着扩展释放
export function activate(context: vscode.ExtensionContext) {
	let cmds = cmdsRegister(context);
	context.subscriptions.push(...cmds);
}

// 当扩展失效时：
export function deactivate() { }
