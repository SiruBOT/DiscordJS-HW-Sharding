const { Server } = require('ws')
const HwSharderError = require('./HwSharderError')
const constant = require('./Constant')
const { webSocketServer } = constant.BaseOptions
const { Headers, Constants, events } = constant
const { Collection } = require('discord.js')
class ShardingServer extends Server {
  /**
   * Server Options
   * @typedef {{ auth: string, port: number, shardCount: number }} serverOptions - Server Options Object
   */
  /**
   * @description Server Instance
   * @param {serverOptions} serverOptions - Server Instance {@link serverOptions}
   */
  constructor (serverOptions = {}) {
    if (!serverOptions.auth) throw new HwSharderError('AUTH_REQUIRED')
    if (typeof serverOptions.auth !== 'string') throw new HwSharderError('AUTH_MUST_STRING')
    if (!serverOptions.port) throw new HwSharderError('SERVER_PORT_REQUIRED')
    if (typeof serverOptions.port !== 'number') throw new HwSharderError('PORT_MUST_NUMBER')
    if (serverOptions.port < 1 || serverOptions.port > 65535) throw new HwSharderError('PORT_RANGE_ERROR')
    if (!serverOptions.shardCount) throw new HwSharderError('SHARDCOUNT_REQUIRED')
    super(Object.assign(serverOptions, webSocketServer))
    this.serverOptions = serverOptions
    this.shards = new Collection()
    this.shardCount = serverOptions.shardCount
  }

  _registerEvents () {
    this.on('connection', this.onWSConnection)
    this.on('listening', this.onListening)
  }

  onListening () {
    this.emit(events.DEBUG, `${Constants.DEBUG} ${Constants.LISTENING} Listening on ${this.address().address}`)
  }

  /**
   * Websocket connection event
   * @param {WebSocket} ws - Websocket Instance
   */
  onWSConnection (ws, req) {
    if (req.headers[Headers.AUTH] !== this.serverOptions.auth) {
      this.emit(events.DEBUG, `${Constants.DEBUG} Authentication Failed from ${req.socket.remoteAddress}`)
      ws.close(401, 'Authentication Failed')
    }
  }
}

module.exports = ShardingServer
