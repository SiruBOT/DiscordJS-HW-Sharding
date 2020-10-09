module.exports.errors = {
  PORT_MUST_NUMBER: () => 'Server Port must be a Number',
  SERVER_PORT_REQUIRED: () => 'Server Port Required (Number [1 ~ 65535])',
  WS_URL_REQUIRED: () => 'Websocket URL Required (ws://xxx.xxx.xxx.xxx:xxxx/)',
  PORT_RANGE_ERROR: () => 'Server Port Range 1 ~ 65535',
  AUTH_REQUIRED: () => 'Server Auth Key Required (String)',
  AUTH_MUST_STRING: () => 'Server Auth must be a String',
  INSTANCE_WS: () => 'Shard constructor `ws` is must be instance of Websocket',
  SHARDCOUNT_REQUIRED: () => 'Shard Count Required > 1',
  CLIENT_INSTANCEOF_DJS: () => 'Client instance is must be instance of discord.js\'s Client',
  CLIENT_INSTANCEOF_WS: () => 'Ws instance is must be instance of ws',
  CONSTRUCTOR_NO_SHARDCOUNT: () => 'You can\'t set manually set `shardCount` constructor in BaseClient constructor',
  CONSTRUCTOR_NO_SHARDS: () => 'You can\'t set manually set `shards` constructor in BaseClient constructor',
  SHARDCOUNT_MORE_ONE: () => 'shardCount must be greater than 1',
  MAXTRIES_MORE_ONE: () => 'maxReconnectTries must be greater than 1',
  MAXTRIES_NUMBER: () => 'maxReconnectTries must be a number',
  MAX_RECONNECT_TRIES: (num) => `Current retry attempts have exceeded the maximum number of retries ${num}`
}

module.exports.events = {
  DEBUG: 'debug',
  LISTENING: 'listen',
  CLOSE: 'close'
}

module.exports.Constants = {
  CONNECT: '[CONNECT]',
  RECONNECT: '[RECONNECT]',
  DEBUG: '[DEBUG]',
  WS: '[WS]',
  SHARD: (id) => `[SHARD ${id}]`,
  INCOME: '[INCOME]',
  ERROR: '[ERROR]',
  LISTENING: '[LISTENING]'
}

module.exports.WSStatus = {
  DISCONNECTED: 'DISCONNECTED',
  CONNECTED: 'CONNECTED',
  RECONNECTING: 'RECONNECTING'
}

module.exports.Headers = {
  AUTH: 'authorization'
}

module.exports.BaseOptions = {
  webSocketServer: {
    noServer: false
  }
}
