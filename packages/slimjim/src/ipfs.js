const IPFS = require('ipfs')

const { promisified, createEventPromise } = require('./utils.js')

const IPFS_CONFIG = {
  EXPERIMENTAL: {
    pubsub: true,
  }
}

const IPFSWrapper = (config = IPFS_CONFIG) => {
  const ipfs = new IPFS(config)
 
  const EVENTS = new Map([
    ['ready', 'onReady'],
    ['stop', 'onStopped'],
    ['err', 'onError']
  ])

  EVENTS.forEach((handler, event) => ipfs[handler] = createEventPromise(ipfs, event))

  const stop = ipfs.stop
  ipfs.stop = (done) => promisified(stop, done)

  return ipfs
}

module.exports = IPFSWrapper
