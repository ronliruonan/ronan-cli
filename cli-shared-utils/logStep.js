const { textGray } = require('./chalk');

module.exports = {
  logStep: msg => console.log('\n', textGray(msg), '\n'),
};
