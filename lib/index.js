const { Command }      = require('commander')
const program          = new Command()

module.exports = function (argv) {
  
  // 用来启动koa应用
  program
    .command('start')
    .option('-p | --path <app path>', 'app path')
    .action((cmd) => {
      require('../command/start')(cmd.path)
    });

  // 用来平滑重启  
  program
    .command('gracefulReload')
    .option('-p | --pid <pid>', 'process id')
    .action((cmd) => {
      require('../command/gracefulReload')(cmd.pid)
    });

  program.parse(argv);
}
