const { EventEmitter } = require('events')
const { Client } = require('discord.js')
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
    super()
    this.client = client
    this.state =
    this.shardOptions = shardOptions
    this.connect()
  }

  /**
   * @description Connect To Websocket
   */
  connect () {
    this.ws = new Websocket(this.shardOptions.wsURL)
  }
}

module.exports = ShardingClient
