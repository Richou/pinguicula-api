import { CsvUtil } from '../common/csvUtil';

export class ContactMock {
    mocked
    csvUtil: CsvUtil

    constructor(csvFile) {
        this.csvUtil = new CsvUtil(csvFile);
    }

    public initMockData() {
      this.mocked = this.csvUtil.renderCsvFile().subscribe({
          next: next => this.mocked = next,
          error: error => console.error(error),
          complete: () => console.info('finished')
      })
    }
      
    public getMockedData() {
      return this.mocked
    }
}