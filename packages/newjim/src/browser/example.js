const creatures = [
  '🐙', '🐷', '🐬', '🐞', 
  '🐈', '🙉', '🐸', '🐓',
  '🐊', '🕷', '🐠', '🐘',
  '🐼', '🐰', '🐶', '🐥'
]

const newLine = '&#13;&#10;'
const DB_ADDRESS = '/orbitdb/QmeEjpU9ucf2Y7v3eDDfG7aH6F84Ar42iPidWTg5Q8cr59/trial'

const elm = document.getElementById("output")
const statusElm = document.getElementById("status")
const dbnameField = document.getElementById("dbname")
const dbAddressField = document.getElementById("dbaddress")
const createButton = document.getElementById("create")
const openButton = document.getElementById("open")
const writerText = document.getElementById("writerText")
const output1 = document.getElementById("output1")

const messageText = document.getElementById("messageText")
const sendButton = document.getElementById("send")

function handleError(e) {
  console.error(e.stack)
  statusElm.innerHTML = e.message  
}

document.querySelector("#messageText").addEventListener("keyup", event => {
  if(event.key !== "Enter") return; // Use `.key` instead.
  document.querySelector("#send").click(); // Things you want to do.
  event.preventDefault(); // No need to `return false;`.
});

const main = (IPFS, ORBITDB) => {
  let orbitdb, db
  let count = 0
  let interval = Math.floor((Math.random() * 300) + (Math.random() * 2000))
  let updateInterval
  let isReady = false

  // If we're building with Webpack, use the injected IPFS module.
  // Otherwise use 'Ipfs' which is exposed by ipfs.min.js
  if (IPFS)
    Ipfs = IPFS

  // If we're building with Webpack, use the injected OrbitDB module.
  // Otherwise use 'OrbitDB' which is exposed by orbitdb.min.js
  if (ORBITDB)
    OrbitDB = ORBITDB

  // Init UI
  openButton.disabled = true
  createButton.disabled = true
  statusElm.innerHTML = "Starting IPFS..."

  // Create IPFS instance
  const ipfs = new Ipfs({
    repo: '/orbitdb/examples/browser/new/ipfs/0.27.3',
    start: true,
    EXPERIMENTAL: {
      pubsub: true,
    },
    config: {
      Addresses: {
        Swarm: [
          // Use IPFS dev signal server
          // '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',
          '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
          // Use local signal server
          // '/ip4/0.0.0.0/tcp/9090/wss/p2p-webrtc-star',
        ]
      },
    }
  })

  ipfs.on('error', (e) => handleError(e))
  ipfs.on('ready', () => {
    openButton.disabled = false
    createButton.disabled = false
    statusElm.innerHTML = "IPFS Started"
    orbitdb = new OrbitDB(ipfs)
  })

  const load = async (db, statusText) => {
    // Set the status text
    statusElm.innerHTML = statusText

    // When the database is ready (ie. loaded), display results
    db.events.on('ready', () => queryAndRender(db))
    // When database gets replicated with a peer, display results
    db.events.on('replicated', () => queryAndRender(db))
    // When we update the database, display result
    db.events.on('write', () => queryAndRender(db))

    db.events.on('replicate.progress', () => queryAndRender(db))

    // Hook up to the load progress event and render the progress
    let maxTotal = 0, loaded = 0
    db.events.on('load.progress', (address, hash, entry, progress, total) => {
      loaded ++
      maxTotal = Math.max.apply(null, [progress, maxTotal, progress, 0])
      total = Math.max.apply(null, [progress, maxTotal, total, 0])
      statusElm.innerHTML = `Loading database... ${maxTotal} / ${total}`
    })

    db.events.on('ready', () => {
      // Set the status text
      setTimeout(() => {
        statusElm.innerHTML = 'Database is ready'
      }, 1000)
    })

    // Load locally persisted database
    await db.load()
  }

  const resetDatabase = async (db) => {
    writerText.innerHTML = ""
    elm.innerHTML = ""

    clearInterval(updateInterval)

    if (db) {
      await db.close()
    }

    interval = Math.floor((Math.random() * 300) + (Math.random() * 2000))
  }

  const createDatabase = async () => {
    await resetDatabase(db)

    openButton.disabled = true
    createButton.disabled = true

    try {
      const name = dbnameField.value
      const publicAccess = true

      db = await orbitdb.open(name, {
        // If database doesn't exist, create it
        create: true, 
        overwrite: false,
        // Load only the local version of the database, 
        // don't load the latest from the network yet
        localOnly: false,
        type: 'docstore',
        // If "Public" flag is set, allow anyone to write to the database,
        // otherwise only the creator of the database can write
        write: publicAccess ? ['*'] : [],
      })

      await load(db, 'Creating database...')
      isReady = true
    } catch (e) {
      console.error(e)
    }
    openButton.disabled = false
    createButton.disabled = false
  }

  const openDatabase = async () => {
    // const address = dbAddressField.value
    const address = DB_ADDRESS

    // await resetDatabase(db)

    openButton.disabled = true
    createButton.disabled = true

    try {
      statusElm.innerHTML = "Connecting to peers..."
      db = await orbitdb.open(address, { sync: true })
      await load(db, 'Loading database...')
      writerText.innerHTML = `Listening for updates to the database...`
      isReady = true
    } catch (e) {
      console.error(e)
    }
    openButton.disabled = false
    createButton.disabled = false
  }

  const sendMessage = async () => {
    if (!isReady) return
    const message = messageText.value
    const _id = new Date().toISOString()
    const dbAddress = db.address.toString()
    const value = { _id, message, dbAddress }
    await db.put(value)
    output1.innerHTML = output1.value + `${newLine}${message}`
  }

  const query = (db) => {
    return db.query((doc) => doc.dbAddress === db.address.toString())
  }

  const queryAndRender = async (db) => {
    const networkPeers = await ipfs.swarm.peers()
    const databasePeers = await ipfs.pubsub.peers(db.address.toString())

    const result = query(db)

    const output = `
      <h2>${db.type.toUpperCase()}</h2>
      <h3 id="remoteAddress">${db.address}</h3>
      <div><i>Copy this address and use the 'Open Remote Database' in another browser to replicate this database between peers.</i></div>
      <br>
      <div><b>Peer ID:</b> ${orbitdb.id}</div>
      <div><b>Peers (database/network):</b> ${databasePeers.length} / ${networkPeers.length}</div>
      <div><b>Oplog Size:</b> ${db._replicationInfo.progress} / ${db._replicationInfo.max}</div>
      <h2>Results</h2>
      <div id="results">
        <div>
        ${JSON.stringify(result, null, 2)}
        </div>
        </div>
      `
    elm.innerHTML = output
  }

  openButton.addEventListener('click', openDatabase)
  createButton.addEventListener('click', createDatabase)
  sendButton.addEventListener('click', sendMessage)
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
  module.exports = main
