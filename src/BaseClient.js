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
  }

  login () {

  }
}

module.exports = BaseClient
