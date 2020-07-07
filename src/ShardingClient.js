const { EventEmitter } = require('events')
const { Client } = require('discord.js')
const ShardLink = require('./ShardLink')
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
   */
  connect () {
    this.ws = new ShardLink(this.shardOptions.wsURL, this.shardOptions.auth)
    this.ws.once('open', ())
  }
}

module.exports = ShardingClient
