/**
 * Test Code
 */
const { should, expect, assert } = require('chai/chai')
const testingEnv = require('./testingEnv')
const { Client } = require('discord.js')
const { ShardingServer, ShardingClient } = require('../src')
should() // Modification global object
console.log('Create Discord.JS\'s Client Instance')
const client = new Client()
let WebsocketServer
let WebsocketClient
describe('Websocket Server', () => {
  it(`Start Websocket Server (auth: ${testingEnv.Server.auth}, port: ${testingEnv.Server.port}, shardCount: ${testingEnv.Server.shardCount})`, (done) => {
    WebsocketServer = new ShardingServer(testingEnv.Server)
    WebsocketServer.on('debug', (message) => {
      console.log(message)
    })
    WebsocketServer.on('listen', (port) => {
      console.log('Sharding Server Listening on ' + port)
      done()
    })
  })
  // wsURL: URL, auth: string, maxReconnectTries: number
  describe('Websocket Client', () => {
    it(`Create Websocket Client (wsURL: ${testingEnv.Client.wsURL}, auth: ${testingEnv.Client.auth}, maxReconnectTries: ${testingEnv.Client.maxReconnectTries})`, () => {
      WebsocketClient = new ShardingClient(client, testingEnv.Client)
      WebsocketClient.on('')
    })
  })
})
