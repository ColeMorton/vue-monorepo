'use strict'

const store = require('./store')
const TodoModel = require('./todoModel')
const OrbitDB = require('orbit-db')

const newLine = '&#13;&#10;'

const init = async () => {
  const messageText = document.getElementById("messageText")
  const sendButton = document.getElementById("send")
  const output = document.getElementById("output")

  try {
    const namespace = 'namespace'
    // Create the store (storage backend), namespace is our database name/id
    var db = await store(namespace);

    // Create the data model
    var model = TodoModel(db, namespace);

    function render(state) {
      console.log('render', state)
      // output.innerHTML = output.value + `${newLine}${message}`
    }

    // Render the app
    console.log('model', model)
    model.subscribe(render)

    // Load the database from locally persisted data
    await db.load()

    const sendMessage = () => {
      model.addTodo(messageText.value)
    }
    sendButton.addEventListener('click', sendMessage)

    // await db.stop()
  } catch (e) {
    throw e
  }
}

init()
