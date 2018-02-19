const assert = require('assert')
const IPFS = require('./ipfs')

describe('ipfs', function() {
  let ipfs

  beforeEach(async function() {
    ipfs = IPFS()
    await ipfs.onReady
  })

  it('should getNode', async function() {
    assert.ok(ipfs.isOnline())
    await ipfs.stop()
  })

  it('should stop node', async function() {
    await ipfs.stop()
    assert.ok(!ipfs.isOnline())
  })
})
