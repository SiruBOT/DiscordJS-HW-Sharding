const { Server } = require('ws')
const HwSharderError = require('./HwSharderError')
const Constant = require('./Constant')
const { EventEmitter } = require('events')
const { webSocketServer } = Constant.BaseOptions
const { Headers, Constants, events } = Constant
const { Collection } = require('discord.js')
class ShardingServer extends EventEmitter {
  /**
   * @description Emitted when logs debug messages
   * @event ShardingServer#debug
   * @param {String} message Debug message
   */
  /**
   * @description Emitted when server listening port
   * @event ShardingServer#listen
   * @param {Number} port Port on listen
   */
  /**
   * Server Options
   * @typedef {{ auth: string, port: number, shardCount: number }} serverOptions - Server Options Object
   */
  /**
   * @description Sharding Server Instance (For IPC)
   * @event ShardingServer#debug
   * @param {serverOptions} serverOptions - Server Instance {@link serverOptions}
   */
  constructor (serverOptions = {}) {
    if (!serverOptions.auth) throw new HwSharderError('AUTH_REQUIRED')
    if (typeof serverOptions.auth !== 'string') throw new HwSharderError('AUTH_MUST_STRING')
    if (!serverOptions.port) throw new HwSharderError('SERVER_PORT_REQUIRED')
    if (typeof serverOptions.port !== 'number') throw new HwSharderError('PORT_MUST_NUMBER')
    if (serverOptions.port < 1 || serverOptions.port > 65535) throw new HwSharderError('PORT_RANGE_ERROR')
    if (!serverOptions.shardCount) throw new HwSharderError('SHARDCOUNT_REQUIRED')
    if (serverOptions.shardCount < 1) throw new HwSharderError('SHARDCOUNT_MORE_ONE')
    super()
    this.serverOptions = serverOptions
    this.wsServer = new Server(Object.assign(serverOptions, webSocketServer))
    this.shards = new Collection()
    this.shardCount = serverOptions.shardCount
    this._registerEvents()
  }

  onListening () {
    this.emit(events.DEBUG, `${Constants.DEBUG} ${Constants.LISTENING} Listening on port ${this.wsServer.address().port}`)
    this.emit(events.LISTENING, this.serverOptions.port)
  }

  /**
   * Websocket connection event
   * @param {WebSocket} ws - Websocket Instance
   */
  onWSConnection (ws, req) {
    if (req.headers[Headers.AUTH] !== this.serverOptions.auth) {
      this.emit(events.DEBUG, `${Constants.DEBUG} Authentication Failed from ${req.socket.remoteAddress}`)
      ws.close(4010, 'Authentication Failed')
    } else {
      this.emit(events.DEBUG, `${Constants.DEBUG} New Connection from ${req.socket.remoteAddress}`)
    }
  }

  /**
   * @description Close Websocket Server
   * @param {String} reason Reason of Server close
   * @returns {void}
   */
  close (reason) {
    this.wsServer.emit('close', reason)
    this.emit(events.CLOSE, reason)
    this.wsServer.close()
    return undefined
  }

  _registerEvents () {
    this.wsServer.on('connection', this.onWSConnection.bind(this))
    this.wsServer.on('listening', this.onListening.bind(this))
  }
}

module.exports = ShardingServer
