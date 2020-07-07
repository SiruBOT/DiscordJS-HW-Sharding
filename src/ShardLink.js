const { Headers } = require('./Constant')
const Websocket = require('ws')
const HwShardError = require('./HwSharderError')
/**
 * @augments Websocket
 */
class ShardLink extends Websocket {
  constructor (url, auth) {
    if (!auth) throw new HwShardError('AUTH_REQUIRED')
    if (typeof auth !== 'string') throw new HwShardError('AUTH_MUST_STRING')
    super(url, { headers: { [Headers.AUTH]: auth } })
  }
}

module.exports = ShardLink
