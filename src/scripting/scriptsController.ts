import {Request, Response} from "express";
import {getLogger, Logger} from "log4js";
import {APPLICATION_LOG_LEVEL} from "../../config";
import {ScriptsService} from "./scriptsService";

export class ScriptsController {
  private readonly logger: Logger = getLogger("ScriptsController");

  constructor(private scriptsSrv: ScriptsService, private scriptFile: string) {
    this.logger.level = APPLICATION_LOG_LEVEL;
  }

  public async runRandomPyScript(request: Request, response: Response): Promise<Response> {
    try {
      const randomResult = await this.scriptsSrv.runPythonScript(this.scriptFile);
      return response.json({result: randomResult});
    } catch (error) {
      this.logger.error(error);
      return response.status(500).json({message: "KO"});
    }
  }
}
