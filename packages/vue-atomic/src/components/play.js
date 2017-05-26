const req = require.context('.', true, /\.\/[^/]+\/[a-zA-Z]+\.play.js$/)

const components = {};
req.keys().forEach((key) => {
  const componentName = key.replace(/^.+\/([^/]+)\/[a-zA-Z]+\.play.js/, '$1')
  components[componentName] = req(key);
})

export default components