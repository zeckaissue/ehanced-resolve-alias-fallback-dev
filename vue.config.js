const path = require('path')
const AliasPlugin = require('enhanced-resolve/lib/AliasPlugin');
const FixAliasPluginCachingResolve = require('./fix-alias-plugin-caching-resolve');


module.exports = {
    configureWebpack: {
      resolve: {
          plugins: [
              new FixAliasPluginCachingResolve({
                enabled: true,
                alias: 'theme',
                targetFolder: path.resolve(__dirname, 'src/components/fancy-theme'),
                fallbackFolder: path.resolve(__dirname, 'src/components/default-theme')
              }),
              new AliasPlugin('described-resolve', [
                  {
                    name: 'theme',
                    alias: [
                      path.resolve(__dirname, 'src/components/fancy-theme'),
                      path.resolve(__dirname, 'src/components/default-theme')
                    ]
                  }
                ], 'resolve')
          ]
      },
    }
}