const { exec }        = require('child_process')

module.exports = function(pid) {

  exec(`kill -HUP ${pid}`, (err, stdout) => {
    if (err) {
      console.log(`执行 kill -HUP ${pid} 时，发生错误：${err}`)
      return;
    }
    console.log(`stdout: ${stdout}`)
  })

}