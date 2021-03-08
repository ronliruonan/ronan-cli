const inquirer = require('inquirer');
const { cacheProjectsValid } = require('../../cli-services/cache');
const __projects__ = cacheProjectsValid();

async function selectCacheProjects() {
  return new Promise(async resolve => {
    const SPLITCHAR = require('../../cli-enums/index').ConstName.SPLITCHAR;

    const questions = [{
      type: 'list',
      message: 'Which local project',
      name: 'inputSelected',
      choices: [].map.call(__projects__, i => (`${i.projectName}${SPLITCHAR}${i.localPath}`))
    }];

    const { inputSelected } = await inquirer.prompt(questions);

    const selectedIdx = [].findIndex.call(__projects__, i => i.localPath === ''.split.call(inputSelected, SPLITCHAR)[1]);
    if (selectedIdx < 0) {
      throw 'your selected do not find, please use `ro list` to confirm the cache';
    }

    const selectedProject = __projects__[selectedIdx];
  
    resolve({ selectedProject, selectedIdx });
  });
}

module.exports = selectCacheProjects;
