const chalk = require('chalk');

// const EnumChalkType = {
//   Red: 'red',
//   RedBright: 'redBright',
//   Cyan: 'cyan',
//   CyanBright: 'cyanBright',
// };

// function textFactory (msgs, type) {
//   return msgs.map(i => chalk`{${type} ${i}}`);
// }

module.exports = {
  textRed: msg => chalk.red(msg),
  textCyan: msg => chalk.cyan(msg),
  textGreen: msg => chalk.green(msg),
  textRedBright: msg => chalk.redBright(msg),
  textCyanBright: msg => chalk.cyanBright(msg),
};
