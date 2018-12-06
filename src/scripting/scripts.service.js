const { spawn } = require('child_process')
const Promise = require('bluebird')

const runPythonScript = function (scriptfile) {
  return new Promise((resolve, reject) => {
    const pyProg = spawn('python', [scriptfile])
    pyProg.stdout.on('data', data => resolve(data.toString().trim()))
    pyProg.stderr.on('data', data => reject(data.toString()))
  })
}

module.exports.runPythonScript = runPythonScript
