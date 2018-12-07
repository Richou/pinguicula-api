import { spawn } from 'child_process'
import Promise = require('bluebird')

export class ScriptsService{

    public runPythonScript(scriptfile) {
      return new Promise((resolve, reject) => {
        const pyProg = spawn('python', [scriptfile])
        pyProg.stdout.on('data', data => resolve(data.toString().trim()))
        pyProg.stderr.on('data', data => reject(data.toString()))
      })
    }
}