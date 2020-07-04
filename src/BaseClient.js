const { Client } = require('discord.js')
const ShardingClient = require('./ShardingClient')
class BaseClient extends Client {
  /**
   * @param {*} clientOptions - Discord.JS Client Options
   * @param {*} shardingOptions
   */
  constructor (clientOptions, shardingOptions) {
    super()
    this.shard = new ShardingClient(this, shardingOptions)
    this._login = this.login
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
