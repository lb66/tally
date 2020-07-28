const path = require("path")
module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(path.resolve('src/assets/icons/svg'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.resolve('src/assets/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
      //删除svg原有的fill属性
      .before('svg-sprite-loader')
      .use('svgo-loader')
      .loader('svgo-loader')
      .options({
        plugins: [
          { removeAttrs: { attrs: 'path:fill' } }
        ]
      })
      .end();
    // config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{ plainSprite: true }]);
    // config.module.rule('svg').exclude.add(path.resolve('src/assets/icons/svg'));
  }
}
