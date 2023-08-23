const path = require('path')
const AliasPlugin = require('enhanced-resolve/lib/AliasPlugin');

module.exports = {
    configureWebpack: {
        resolve: {
            plugins: [
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
        }
    }
}