import * as vscode from 'vscode';

import { packagejson } from '../utils';

interface CmdConfig {
  command: string,
  title: string,
}

interface CmdESMoudle {
  command: string,
  esModule: () => void,
}

export default function (context: vscode.ExtensionContext): any[] {
  const cmdConfigs: CmdConfig[] = packagejson.contributes.commands;
  const cmdESModules: CmdESMoudle[] = [];

  cmdConfigs.forEach(async c => {
    const command = c.command;
    const cmdFileName = c.command.split('.')[1];
    const foo = require('./' + cmdFileName);
    cmdESModules.push({ command, esModule: foo.default });
  });
  
  return cmdESModules.map(item => {
    vscode.commands.registerCommand(item.command, item.esModule.bind(context, context));
  });
};
