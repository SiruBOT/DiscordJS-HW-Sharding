const { Server } = require('ws')
const HwSharderError = require('./HwSharderError')
const { webSocketServer } = require('./Constant').baseOptions
const { Collection } = require('discord.js')
class ShardingServer extends Server {
  /**
   * Server Options
   * @typedef {{auth: string, port: number, shardCount: number}} serverOptions - Server Options Object
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
    if (!serverOptions.shardCount) throw new HwSharderError()
    super(Object.assign(serverOptions, webSocketServer))
    this.shards = new Collection()
    this.shardCount = serverOptions.shardCount
  }
}

module.exports = ShardingServer
