const { Command } = require('commander')

const commander = new Command

commander
    .option('-m, --mode <mode>', "Set environment", 'production')
    .option('-p, --persistence <persistence>', 'Set persistence', 'mongo')
    .parse()

module.exports = { commander }