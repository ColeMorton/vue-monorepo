const req = require.context('.', true, /^.+\/([^/]+)\/index\.vue/)

const components = {};
req.keys().forEach((key) => {
  const componentName = key.replace(/^.+\/([^/]+)\/index\.vue/, '$1')
  components[componentName] = req(key);
})

export default components

// const req = require.context('.', true, /\.\/[^/]+\/[^/]+\/index\.js$/)

// req.keys().forEach((key) => {
//   const componentName = key.replace(/^.+\/([^/]+)\/index\.js/, '$1')
//   module.exports[componentName] = req(key).default
// })
