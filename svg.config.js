module.exports = function (config) {
  const svgDirs = [
    /.*\/style\/assets/,
  ]
  // exclude the default svg-url-loader from atool-build https://github.com/ant-tool/atool-build/blob/master/src/getWebpackCommonConfig.js#L161
  if (config.module.loaders === undefined) { config.module.loaders = [] }
  config.module.loaders.forEach((loader) => {
    if (loader.test.toString() === '/\\.svg(\\?v=\\d+\\.\\d+\\.\\d+)?$/') {
      loader.exclude = svgDirs
    }
  })
  // Note: https://github.com/kisenka/svg-sprite-loader/issues/4
  // Can not process SVG files twice
  if (config.module.loaders.length > 0 && config.module.loaders[0].loader !== 'svg-sprite-loader') {
    config.module.loaders.unshift({
      test: /\.svg$/,
      loader: 'svg-sprite-loader',
      include: svgDirs,
    })
  }
}
