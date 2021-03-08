function openWithVsCode(fullPathProject) {
  (async () => {
    const identifier = 'com.microsoft.VSCode';
    const installPath = await require('app-path')(identifier);
    const excutableShim = require('path').join(
      installPath,
      'Contents',
      'Resources',
      'app',
      'bin',
      'code'
    );
    require('child_process').spawn(excutableShim, [fullPathProject]);
  })();
}

function openWithFinder(fullPathProject) {
  return `open ${fullPathProject}`;
}

function openWithBroswer(url) {
  return `open ${url}`;
}

module.exports = { openWithVsCode, openWithFinder, openWithBroswer };
