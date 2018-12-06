const csvUtil = require('../common/csv.util')

let mocked = []

const initMockData = async function (mockfile) {
  mocked = await csvUtil.renderCsvFile(mockfile)
}

const getMockedData = function () {
  return mocked
}

module.exports.initMockData = initMockData
module.exports.getMockedData = getMockedData
