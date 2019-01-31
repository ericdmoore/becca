// const path = require('path')
const webpackMerge = require('webpack-merge')
const loadPresets = require('./build_utils/loadPresets-Webpack.js')

module.exports = (env) => {
  // expand the dev/prod shorthands
  !env && console.warn('Env is missing defaulting to dev - Webpack would prefer PROD')
  let { mode } = { mode: 'development', ...env }
  const commonConfig = require('./build_utils/webpack.common.js')
  const envConfig = require(`./build_utils/webpack.${env.mode}.config.js`)

  let mergedConfig = webpackMerge({ mode }, commonConfig(env), envConfig(env))
  // console.log(JSON.stringify(mergedConfig, null, 2))

  mergedConfig = webpackMerge(mergedConfig, loadPresets(env))
  // console.log(mergedConfig)
  // console.log(JSON.stringify(mergedConfig.module.rules[3], null, 2))

  return mergedConfig
}
