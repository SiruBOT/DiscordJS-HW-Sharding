const { Headers, WSStatus } = require('./Constant')
const Websocket = require('ws')
const HwShardError = require('./HwSharderError')
class ShardLink extends Websocket {
  constructor (url, auth) {
    if (!auth) throw new HwShardError('AUTH_REQUIRED')
    if (typeof auth !== 'string') throw new HwShardError('AUTH_MUST_STRING')
    super(url, { headers: { [Headers.AUTH]: auth } })
    this.status = WSStatus.DISCONNECTED
    this.setup()
  }

  setup () {
    this.on('open', () => { this.status = WSStatus.CONNECTED })
    this.on('close', () => {
      this.status = WSStatus.DISCONNECTED
    })
  }
}

module.exports = ShardLink
