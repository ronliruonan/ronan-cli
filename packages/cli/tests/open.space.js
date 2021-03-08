const { spawn, exec } = require('child_process');
// spawn('open .', { cwd: '/Users/mac/Documents/GitHub/ronan/tying-cli', shell: false})

// exec('open .', { cwd: '/Users/mac/Documents/GitHub/ronan/tying-cli' })

exec('open vscode://file/Users/mac/Documents/GitHub/ronan/tying-cli', { cwd: '/Users/mac/Documents/GitHub/ronan/tying-cli' })