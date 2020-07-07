const { EventEmitter } = require('events')
const { Client } = require('discord.js')
const WSClient = require('./WSClient')
const { WSStatus } = require('./Constant')
const HwSharderError = require('./HwSharderError')
class ShardingClient extends EventEmitter {
  /**
   * Shard Client Options
   * @typedef {{ wsURL: URL, auth: string }} shardOptions - shard Options
   */
  /**
   *
   * @param {Client} client - Instanceof Discord Client
   * @param {shardOptions} shardOptions - ShardingClient Options
   */
  constructor (client, shardOptions = {}) {
    if (!shardOptions.wsURL) throw new HwSharderError('WS_URL_REQUIRED')
    if (typeof shardOptions.wsURL !== 'string') throw new HwSharderError('AUTH_MUST_STRING')
    if (!shardOptions.auth) throw new HwSharderError('AUTH_REQUIRED')
    if (typeof shardOptions.auth !== 'string') throw new HwSharderError('AUTH_MUST_STRING')
    if (!(client instanceof Client)) throw new HwSharderError()
    super()
    this.client = client
    this.shardOptions = shardOptions
    this.status = WSStatus.DISCONNECTED
    this.connect()
  }
  
  /**
   * @description Connect To Websocket
   * @param {Boolean} [reconnect=false] - Is reconnect or not
   */
  connect (reconnect = false) {
    if (reconnect) this.ws.terminate()
    if (reconnect) this.status = WSStatus.RECONNECTING
    this.ws = new WSClient(this.shardOptions.wsURL, this.shardOptions.auth)
    this.ws.once('open', () => {
      this.status = WSStatus.CONNECTED
    })
    this.ws.once('close', () => {
      this.status = WSStatus.DISCONNECTED
      this.connect(true)
    })
  }
}

module.exports = ShardingClient
