const req = require.context('.', true, /^((?!index).)*\.vue$/)

req.keys().forEach((key) => {
  const name = key.replace(/^\.\/([^.]+)\.vue$/, '$1')
  module.exports[name] = req(key)
})
