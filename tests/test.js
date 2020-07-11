/**
 * Test Code
 */
const { should, expect, assert } = require('chai/chai')
const testingEnv = require('./testingEnv')
should() // Modification global object
describe('Websocket Server', () => {
  it(`Start Websocket Server (auth: ${testingEnv.auth}, serverPort: ${testingEnv.serverPort}, shardCount: ${testingEnv.shardCount})`, (done) => {
    const obj = { a: 'a' }
    obj.should.key('a')
    obj.a.should.to.be.an('array')
    done()
  })
})
