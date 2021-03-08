// spawn(editorPath, fullPath)
const vscodeIdentifiers = ['com.microsoft.VSCode'];
function vscodeExecutableShim(installPath) {
    return require('path').join(
        installPath,
        'Contents',
        'Resources',
        'app',
        'bin',
        'code'
    )
};

(async () => {
    const installPath = await require('app-path')(vscodeIdentifiers[0]);
    console.log('installPath:')
    console.log(installPath);

    const path = vscodeExecutableShim(installPath);
    console.log('path:')
    console.log(path);

    const test1 = '/Users/mac/Documents/GitHub/ronan/tying-cli';
    
    const cmd = path + ' ' + test1;
    console.log('cmd:')
    console.log(cmd);

    console.log();
    const { spawn } = require('child_process');
    spawn(path, [test1]);
    console.log('end')
})();