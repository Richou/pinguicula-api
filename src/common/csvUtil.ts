import fs = require("fs");
import {getLogger, Logger} from "log4js";
import readline = require("readline");
import {Observable} from "rxjs";

export class CsvUtil {

  private readonly logger = getLogger("CsvUtil");

  constructor(private csvFile) {
    this.logger.level = process.env.APPLICATION_LOG_LEVEL;
  }

  public renderCsvFile() {
    return Observable.create((emitter) => {
      try {
        const readStream = fs.createReadStream(this.csvFile).on("error", (error) => {
          this.logger.warn("An error has occured, returning empty array", error);
          emitter.complete();
        });
        const linesStream = readline.createInterface({
          crlfDelay: Infinity,
          input: readStream,
        });
        let currentLine = 0;
        let headers: string[] = [];
        linesStream.on("line", (line) => {
          if (currentLine !== 0) {
            const splitted = line.split(",");
            if (splitted.length !== headers.length) {
              this.logger.warn("The line is not well formated, skipping");
            } else {
              const lineObject = {};
              for (let index = 0; index < splitted.length; index++) {
                lineObject[headers[index].trim()] = splitted[index].trim();
              }
              emitter.next(lineObject);
            }
          } else {
            headers = line.split(",");
          }
          currentLine++;
        }).once("close", () => {
          this.logger.debug("File Streaming is closed");
          emitter.complete();
        });
      } catch (error) {
        this.logger.error(error);
        emitter.complete();
      }
    });
  }
}
