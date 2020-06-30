const co = require('./Constant')
class HwSharderError extends Error {
  /**
   * @description HwSharderError Class
   * @param {String} errName - Error Name
   */
  constructor (errName, ...args) {
    super(`[${errName}] ` + co.errors[errName](...args))
  }
}

module.exports = HwSharderError
