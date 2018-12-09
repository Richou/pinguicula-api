import {getLogger} from "log4js";
import {APPLICATION_LOG_LEVEL} from "../../config";
import {CsvUtil} from "../common/csvUtil";
import {Contact} from "./contactModel";

export class ContactMock {
  public mocked: Contact[] = [];
  public csvUtil: CsvUtil;
  private readonly logger = getLogger("ContactMock");

  constructor(csvFile) {
    this.logger.level = APPLICATION_LOG_LEVEL;
    this.csvUtil = new CsvUtil(csvFile);
  }

  public initMockData() {
    this.csvUtil.renderCsvFile().subscribe({
      complete: () => this.logger.debug("Parsing mocked file finished"),
      error: (error) => this.logger.error(error),
      next: (next) => this.mocked.push(next),
    });
  }

  public getMockedData(): Contact[] {
    return this.mocked;
  }
}
