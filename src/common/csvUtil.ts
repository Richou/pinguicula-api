import fs = require('fs');
import log4js = require('log4js');
import { Observable } from 'rxjs';
import readline = require('readline');

export class CsvUtil {

    private logger;

    constructor(private csvFile) {
        this.logger = log4js.getLogger("CsvUtil");
    }

    renderCsvFile() {
        return Observable.create(emitter => {
            try {
                const readStream = fs.createReadStream(this.csvFile).on('error', error => {
                    this.logger.warn('An error has occured, returning empty array', error)
                  emitter.next([])
                  emitter.complete()
                })
                const linesStream = readline.createInterface({
                  input: readStream,
                  crlfDelay: Infinity
                })
                let currentLine = 0
                const rendered = []
                let headers = []
                linesStream.on('line', line => {
                  if (currentLine !== 0) {
                    const splitted = line.split(',')
                    if (splitted.length !== headers.length) {
                        this.logger.warn('The line is not well formated, skipping')
                    } else {
                      let lineObject = {}
                      for (let index = 0; index < splitted.length; index++) {
                        lineObject[headers[index].trim()] = splitted[index].trim()
                      }
                      rendered.push(lineObject)
                    }
                  } else {
                    headers = line.split(',')
                  }
                  currentLine++
                }).once('close', () => {
                  this.logger.debug('CSV File parsed and rendered')
                  emitter.next(rendered)
                  emitter.complete()
                })
              } catch (error) {
                this.logger.error(error)
                emitter.next([])
                emitter.complete()
              }  
        })
    }
}