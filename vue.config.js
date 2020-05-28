module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {
    config.externals({
      'import-html-entry': 'import-html-entry'
    })
  }
}
