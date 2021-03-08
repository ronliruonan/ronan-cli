import * as vscode from 'vscode';

export function showError (msg: string, ...items: string[]) {
  vscode.window.showErrorMessage(msg, ...items);
}

export function showInfo (msg: string, ...items: string[]) {
  vscode.window.showInformationMessage(msg, ...items);
}

export function showWarning (msg: string, ...items: string[]) {
  vscode.window.showWarningMessage(msg, ...items);
}