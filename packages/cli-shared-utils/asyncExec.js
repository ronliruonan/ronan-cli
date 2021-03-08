module.exports = async function asyncExec (path, cmd, silent = false) {
  return new Promise(resolve => {
    require('shelljs').exec(
      cmd,
      { cwd: path, silent },
      (code, stdout, stderr) => resolve({ code, stdout, stderr })
    )
  });
};
