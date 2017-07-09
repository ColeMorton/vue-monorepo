const req = require.context('.', true, /^((?!index).)*\.js$/)

req.keys().forEach((key) => {
  const name = key.replace(/^\.\/([^.]+)\.js$/, '$1')
  module.exports[name] = req(key)
})
