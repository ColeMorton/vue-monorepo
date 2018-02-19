const TodoModel = require('./todoModel')
const store = require('./store')

const assert = require('assert')
const app = require('./index')

describe('app', function() {
  it('should initialise', function(done) {
    const wrapper = async () => {
      try {
        const namespace = '123abc'
    
        // Create the store (storage backend), namespace is our database name/id
        const db = await store(namespace)
    
        // Create the data model
        const model = TodoModel(db, namespace)
    
        const render = () => {
          console.log('model.getState...', model.getState().todos)
        }
    
        // Render the app
        model.subscribe(render)
        render()
    
        await model.addTodo('I do not know')
    
        await db.stop()
      } catch (e) {
        throw e
      }
      done()
    }
    assert.doesNotThrow(wrapper)
  })
})
