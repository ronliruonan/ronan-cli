const { spawn } = require('child_process')

module.exports = (cmd, cwd) => spawn(cmd, { cwd, shell: true, stdio: 'inherit' })
