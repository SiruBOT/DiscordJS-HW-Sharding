const { Client } = require('discord.js')
const ShardingClient = require('./ShardingClient')
const HWSharderError = require('./HwSharderError')
class BaseClient extends Client {
  /**
   * @param {Object} clientOptions - Discord.JS Client Options
   * @param {*} shardingOptions
   */
  constructor (clientOptions, shardingOptions) {
    if (clientOptions.shardCount) throw new HWSharderError('CONSTRUCTOR_NO_SHARDCOUNT')
    if (clientOptions.shards) throw new HWSharderError('CONSTRUCTOR_NO_SHARDS')
    super(clientOptions)
    this.shard = new ShardingClient(this, shardingOptions)
  }

  /**
   * @description Initialize Sharding Websocket, Logins Discord's Gateway
   * @param {String} token - Bot's Token
   */
  async login (token) {
    await super.login(token)
  }
}

module.exports = BaseClient
