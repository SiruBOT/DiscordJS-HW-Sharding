const Websocket = require('ws')
const HwSharderError = require('./HwSharderError')
class Shard {
  /**
   * Shard Instance
   * @param {*} ws
   */
  constructor (ws) {
    if (!(ws instanceof Websocket)) throw new HwSharderError('')
    this._ws = ws
  }

  _registerEvents () {

  }
}

module.exports = Shard
