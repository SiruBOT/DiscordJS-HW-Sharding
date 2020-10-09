const { EventEmitter } = require('events')
const { Client } = require('discord.js')
const WSClient = require('./WSClient')
const { WSStatus, events, Constants } = require('./Constant')
const HwSharderError = require('./HwSharderError')
class ShardingClient extends EventEmitter {
  /**
   * Shard Client Options
   * @typedef {{ wsURL: URL, auth: string, maxReconnectTries: number }} shardOptions - shard Options
   */
  /**
   * Constructor
   * @param {Client} client - Instanceof Discord Client
   * @param {shardOptions} shardOptions - ShardingClient Options
   */
  constructor (client, shardOptions = {}) {
    if (!(client instanceof Client)) throw new HwSharderError('CLIENT_INSTANCEOF_DJS')
    if (!shardOptions.wsURL) throw new HwSharderError('WS_URL_REQUIRED')
    if (typeof shardOptions.wsURL !== 'string') throw new HwSharderError('AUTH_MUST_STRING')
    if (!shardOptions.auth) throw new HwSharderError('AUTH_REQUIRED')
    if (typeof shardOptions.auth !== 'string') throw new HwSharderError('AUTH_MUST_STRING')
    if (shardOptions.maxReconnectTries) {
      if (typeof shardOptions.maxReconnectTries !== 'number') throw new HwSharderError('MAXTRIES_NUMBER')
      if (shardOptions.maxReconnectTries < 1) throw new HwSharderError('MAXTRIES_MORE_ONE')
    } else {
      shardOptions.maxReconnectTries = 10
    }
    super()
    this.client = client
    this.shardOptions = shardOptions
    this.status = WSStatus.DISCONNECTED
    this.reconnectTries = 0
    this.maxReconnectTries = shardOptions.maxReconnectTries
    this.connect()
  }

  /**
   * @description Connect To Websocket
   * @param {Boolean} [reconnect=false] - Is reconnect or not
   */
  connect (reconnect = false) {
    this.emit(events.DEBUG, `${Constants.DEBUG} ${Constants.WS} ${reconnect ? Constants.RECONNECT : Constants.CONNECT} ${reconnect ? 'Reconnect' : 'Connect'} to Server [${this.shardOptions.wsURL}]`)
    if (reconnect) this.ws.terminate()
    if (reconnect) this.status = WSStatus.RECONNECTING
    if (reconnect && this.maxReconnectTries < this.reconnectTries) throw new HwSharderError('MAX_RECONNECT_TRIES', this.maxReconnectTries)
    this.ws = new WSClient(this.shardOptions.wsURL, this.shardOptions.auth)
    this.ws.once('open', () => {
      this.status = WSStatus.CONNECTED
      this.emit(events.DEBUG, `${Constants.DEBUG} ${Constants.WS} Connected to server ${this.shardOptions.wsURL}`)
    })
    this.ws.once('close', (code, reason) => {
      if (code === 4010) throw new HwSharderError(reason)
      this.status = WSStatus.DISCONNECTED
      const reconnect = () => {
        this.reconnectTries++
        const reconectTimeout = this.reconnectTries * 5000
        this.emit(events.DEBUG, `${Constants.DEBUG} Websocket Closed, Reconnecting to Server in ${reconectTimeout}ms..`)
        setTimeout(() => {
          this.connect(true)
          this.ws.once('error', () => {
            this.emit(events.DEBUG, `${Constants.DEBUG} Websocket Reconnect Failed, Reconnecting..`)
          })
        }, reconectTimeout)
      }
      reconnect()
    })
  }
}

module.exports = ShardingClient
