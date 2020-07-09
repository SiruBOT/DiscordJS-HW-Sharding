const Websocket = require('ws')
const HwSharderError = require('./HwSharderError')
class Shard {
  /**
   * Shard Instance
   * @param {Websocket} ws Websocket Instance
   * @param {Number} id - Shard's ID
   */
  constructor (ws, id) {
    if (!(ws instanceof Websocket)) throw new HwSharderError('CLIENT_INSTANCEOF_WS')
    this._ws = ws
    this.id = id
  }

  _registerEvents () {
  }
}

module.exports = Shard
