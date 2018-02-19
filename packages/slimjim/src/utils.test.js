const assert = require('assert')

const { promisified, createEventPromise } = require('./utils')

describe('promisified', function() {
  it('should resolve the promise', async function() {
    const func = (done) => done()
    await promisified(func)
  })

  it('should resolve the promise with args', async function() {
    const func = (done) => done(1, 2, 3)
    assert.deepEqual(await promisified(func), [1, 2, 3])
  })

  it('should call the done callback', async function() {
    const func = (done) => done()
    let cbCalled = false
    const done = () => cbCalled = true
    await promisified(func, done)
    assert.ok(cbCalled)
  })
})
