const Model = require('./model')

const uuid = () => {
  var i, random;
  var uuid = '';

  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }
    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
      .toString(16);
  }

  return uuid;
}

const TodoModel = (db) => {
  const model = Model(db)
  const { add, remove, update, setState, getState } = model

  setState({
    todos: []
  })

  const subscribe = (done) => model.subscribe(() => {
    const todos = db
      .query(e => true, { fullOp: true })
      .map(e => e.todo)
    setState({ todos })
    done(getState())
  })

  const addTodo = async (title) => {
    const todo = {
      id: uuid(),
      title: title,
      completed: false
    }

    await add(todo.id, { todo })
  }

  const toggle = async (todoToToggle) => {
    const todo = {
      ...todoToToggle,
      ...{completed: !todoToToggle.completed}
    }
    await add(todo.id, { todo })
  }

  const destroy = async (todo) => await remove(todo.id)

  const save = async (todoToSave, title) => {
    const todo = {
      ...todoToSave,
      ...{ title }
    }
    await update(todo.id, { todo })
  }

  return {
    ...model,
    subscribe,
    addTodo,
    toggle,
    destroy,
    save
  }
}

module.exports = TodoModel
