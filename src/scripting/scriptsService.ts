import {spawn} from "child_process";

export class ScriptsService {

  public runPythonScript(scriptFile: string) {
    return new Promise((resolve, reject) => {
      const pyProg = spawn("python", [scriptFile]);
      pyProg.stdout.on("data", (data) => resolve(data.toString().trim()));
      pyProg.stderr.on("data", (data) => reject(data.toString()));
    });
  }
}
