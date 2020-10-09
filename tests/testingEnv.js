module.exports.Server = {
  port: 3000,
  auth: 'youshallnotpass',
  shardCount: 2
}

module.exports.Client = {
  auth: 'youshallnotpass',
  wsURL: 'ws://localhost:3000',
  maxReconnectTries: 10
}
