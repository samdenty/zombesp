const path = require('path')
const webpack = require('webpack')

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    externals: [{ fs: true }],
    plugins: [
      new webpack.NormalModuleReplacementPlugin(/typeorm$/, function(result) {
        result.request = result.request.replace(/typeorm/, 'typeorm/browser')
      }),
      new webpack.NormalModuleReplacementPlugin(/type-graphql$/, function(
        result
      ) {
        result.request = result.request.replace(
          /type-graphql/,
          // @TODO https://github.com/19majkel94/type-graphql/pull/216
          path.resolve(__dirname, './scripts/shims/type-graphql.js')
        )
      }),
      new webpack.ProvidePlugin({
        'window.SQL': 'sql.js/js/sql.js',
      }),
    ],
  })
}
