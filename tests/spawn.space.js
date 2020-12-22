// const spawn = require('../cli-shared-utils/spawn');

// // console.log(process.cwd());
// // spawn('cd d:/gitlab/', process.cwd());

// // console.log();
// // console.log(process.cwd());

// // const { spawn } = require('child_process')

// // console.log(process.cwd());
// // spawn('cd d:/gitlab/', { cwd, shell: true, stdio: 'inherit' })

// console.log('0000000000')
// const res = spawn('git status', 'd:/gitlab/');
// console.log('1111111111')
// console.log(res);
// console.log('22222222222222')

// // res.stdout.on('data', data => {
// //   console.log('--------')
// //   console.log(data);
// // })

// // res.stderr.on('data', data => {
// //   console.log('=============')
// //   console.log(data);
// // })

// res.on('close', code => {
//   console.log('0000000000')
//   console.log(code);
// })

console.log('*******************');
try {
  const res = require('child_process').execSync('git status', { cwd: 'ccccc' });
  console.log(':::::::', res);
} catch (error) {
  console.log('??????', error);
}

require('shelljs').exec