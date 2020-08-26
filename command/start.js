const cluster         = require('cluster')
const CPUs            = require('os').cpus()
let workId            = 1
let workCount         = 0

module.exports = function(path) {

  console.log('start reload...', path)
  if (cluster.isMaster) {

    CPUs.length && CPUs.forEach(() => {
      cluster.fork()
    });

    cluster.on('exit', (worker, code, signal) => {
      console.log(`工作进程 ${worker.id} 已退出 ${code} --- ${signal}`);
    });

    process.on('SIGHUP', () => {

      // 这里开始递归重启所有子进程
      let restartWork = () => {

        if (!cluster.workers[workId]) {
          console.log('this worker not exist!')
          return;
        }

        if (workCount >= CPUs.length) {
          console.log('all workers are restarted success!')
          workCount = 0
          return;
        }
        // console.log('cluster.workers[i]: ',cluster.workers[5])
        cluster.workers[workId].send(`worker ${workId} exit`)

        // disconnect后，存量请求会正常响应，增量请求会引导到其他子进程上。
        cluster.workers[workId].on('disconnect', () => {
          console.log(`工作进程 #${workId} 已断开连接`);
        })

        cluster.workers[workId].disconnect()
          
        cluster.fork().on('listening', () => {
          console.log(`process ${process.pid} already restart!`)
          workCount++
          restartWork(++workId)
        });
        
      }  
      restartWork(workId)
    });

  } else {
    require(path)
    process.on('message', (msg) => {
      if (msg === 'shutdown') {
        process.exit(0)
      }
    })
  }
}