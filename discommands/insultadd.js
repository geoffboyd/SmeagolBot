const adder = require('../discommands/addinfo.js');
module.exports = {
  name: 'insultadd',
  description: 'Add new insults',
  execute(msg, args) {
    adder.contentinfo(msg, args, 'insult', 'insult')
  },
};