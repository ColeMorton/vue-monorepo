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

const canSubscribe = (getState) => {
  const onChanges = []
  
  const subscribe = (onChange) => onChanges.push(onChange)

  const inform = async () => onChanges.forEach((cb) => cb(getState()))

  return {
    subscribe,
    inform
  }
}

const asyncCbFunc = (asyncFunc, cb) => async (...args) => {
  const result = await asyncFunc(...args)
  typeof cb == 'function' && cb(result)
  return result
}

const canAdd = (db, cb) => ({
  add: asyncCbFunc(async (_id, data) => {
    await db.put({ _id, ...data })
  }, cb)
})

const canRemove = (db, cb) => ({
  remove: asyncCbFunc(async (_id) => {
    await db.del(_id)
  }, cb)
})

const canUpdate = (db, cb) => ({
  update: asyncCbFunc(async (_id, data) => {
    await db.put({ _id, ...data })
  }, cb)
})

const Model = (db) => {
  const state = {
    ready: false,
    status: {
      loaded: 0,
      total: 0,
    }
  }

  const setState = (newState) => Object.keys(newState).forEach((key) => state[key] = newState[key])
  const getState = () => ({ ...state })
  const { inform, subscribe } = canSubscribe(getState)

  // When the database was loaded and is ready to use, 
  // refresh our data model and set the state to ready
  db.events.on('ready', () => {
    state.ready = true
    inform()
  })

  // When a remote peer updated the todos, refresh our data model
  db.events.on('replicated', () => inform())

  // Watch for load progress and update the model state with the progress
  db.events.on('load.progress', (address, hash, entry, progress, total) => {
    state.status.loaded = progress
    state.status.total = total
    inform()
  })

  return {
    setState,
    getState,
    subscribe,
    ...canAdd(db, inform),
    ...canRemove(db, inform),
    ...canUpdate(db, inform)
  }
}

module.exports = Model
