const req = require.context('.', true, /\.\/[^/]+\/[a-zA-Z]+\.vue$/)

const components = {};
req.keys().forEach((key) => {
  const componentName = key.replace(/^.+\/([^/]+)\/[a-zA-Z]+\.vue/, '$1')
  components[componentName] = req(key);
})

export default components
