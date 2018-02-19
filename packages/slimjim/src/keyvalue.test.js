const assert = require('assert')

const IPFS = require('./ipfs')
const OrbitDB = require('orbit-db')
const keyvalue = require('./keyvalue')

describe('keyvalue', function() {
  let ipfs

  beforeEach(async function() {
    ipfs = IPFS()
    await ipfs.onReady
  })

  it('should init', async function() {
    try {
      const orbitdb = new OrbitDB(ipfs, './orbitdb/examples/keyvalue')
      const db = await keyvalue.init(orbitdb)
      await keyvalue.example(db)
      await db.close()
      await db.drop()
      await orbitdb.stop()
      await ipfs.stop()
    } catch (e) {
      console.error(e)
      process.exit(1)
    }
  })
})
