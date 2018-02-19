'use strict'

const userId = 1
const creatures = ['🐙', '🐬', '🐋', '🐠', '🐡', '🦀', '🐢', '🐟', '🐳']

const output = (user) => {
  if (!user)
    return

  let output = ``
  output += `----------------------\n`
  output += `User\n`
  output += `----------------------\n`
  output += `Id: ${userId}\n`
  output += `Avatar: ${user.avatar}\n`
  output += `Updated: ${user.updated}\n`
  output += `----------------------\n`
  console.log(output)
}

const init = async (orbitdb) => {
  try {
    console.log("Starting...")
    return await orbitdb.kvstore('example', { overwrite: true })
  } catch (e) {
    console.error(e)
    return Promise.reject()
  }
}

const example = async (db) => {
  try {
    // Randomly select an avatar
    const index = Math.floor(Math.random() * creatures.length)

    // Set the key to the newly selected avatar and update the timestamp
    await db.put(userId, { avatar: creatures[index], updated: new Date().getTime() })

    // Get the value of the key
    const user = db.get(userId)

    // Display the value
    output(user)
  } catch (e) {
    console.error(e)
    return Promise.reject()
  }
}

module.exports = {
  init,
  example
}