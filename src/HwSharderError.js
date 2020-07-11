const co = require('./Constant')
class HwSharderError extends Error {
  /**
   * @description HwSharderError Class
   * @param {String} errName - Error Name
   */
  constructor (errName, ...args) {
    super(co.errors[errName] ? `[${errName}] ` + co.errors[errName](...args) : errName)
  }
}

module.exports = HwSharderError
