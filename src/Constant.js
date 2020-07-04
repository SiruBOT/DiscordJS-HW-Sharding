module.exports.errors = {
  PORT_MUST_NUMBER: () => 'Server Port must be a Number',
  SERVER_PORT_REQUIRED: () => 'Server Port Required (Number [1 ~ 65535])',
  WS_URL_REQUIRED: () => 'Websocket URL Required (ws://xxx.xxx.xxx.xxx:xxxx/)',
  PORT_RANGE_ERROR: () => 'Server Port Range 1 ~ 65535',
  AUTH_REQUIRED: () => 'Server Auth Key Required (String)',
  AUTH_MUST_STRING: () => 'Server Auth must be a String',
  INSTANCE_WS: () => 'Shard constructor `ws` is must be instance of Websocket',
  SHARDCOUNT_REQUIRED: () => 'Shard Count Required > 1'
}

module.exports.WSStatus = {
  DISCONNECTED: 'DISCONNECTED',
  CONNECTED: 'CONNECTED'
}

module.exports.Headers = {
  AUTH: 'Authorization'
}

module.exports.baseOptions = {
  webSocketServer: {
    noServer: false
  }
}
