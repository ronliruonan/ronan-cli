async function sureOpenWithVsCode (workspacePath) {
  const questions = [{
    type: 'confirm',
    message: 'open with VSCode now:',
    name: 'inputYeah'
  }];
  const { inputYeah } = await require('inquirer').prompt(questions);

  inputYeah === true && require('../../cli-editors/index').openWithVsCode(workspacePath);
}

module.exports = sureOpenWithVsCode;
