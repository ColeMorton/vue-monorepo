'use strict'

const creatures = ['🐙', '🐷', '🐬', '🐞', '🐈', '🙉', '🐸', '🐓']

const init = async (orbitdb) => {
  try {
    console.log("Starting...")
    return await orbitdb.eventlog('example', { overwrite: true })
  } catch (e) {
    console.error(e)
    return Promise.reject()
  }
}

const example = async (db) => {
  const index = Math.floor(Math.random() * creatures.length)
  const userId = Math.floor(Math.random() * 900 + 100)

  try {
    await db.add({ avatar: creatures[index], userId: userId })
    const latest = db.iterator({ limit: 5 }).collect()
    let output = ``
    output += `[Latest Visitors]\n`
    output += `--------------------\n`
    output += `ID  | Visitor\n`
    output += `--------------------\n`
    output += latest.reverse().map((e) => e.payload.value.userId + ' | ' + e.payload.value.avatar + ')').join('\n') + `\n`
    console.log(output)
  } catch (e) {
    console.error(e)
    return Promise.reject()
  }
}

module.exports = {
  init,
  example
}