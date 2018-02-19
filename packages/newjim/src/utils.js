const createEventPromise = (node, event) => new Promise((resolve) => node.on(event, (...args) => resolve(args)))

const promisified = (func, done) => new Promise((resolve) => {
  func((...args) => {
    resolve(args)
    typeof done == 'function' && done(...args)
  })
})

module.exports = {
  createEventPromise,
  promisified
}
