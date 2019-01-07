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
  getConfig,
}) => {
  actions.setWebpackConfig({
    externals: [{ fs: true }],
    module: {
      rules: [
        {
          test: /\.(html)$/,
          loader: [
            'file-loader?name=[name].[ext]',
            'extract-loader',
            'html-loader?interpolate',
          ],
        },
      ],
    },

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

// Prefixes should be globs (i.e. of the form "/*" or "/foo/*")
const validatePrefixEntry = prefix => {
  if (!prefix.match(/^\//) || !prefix.match(/\/\*$/)) {
    throw Error(
      `Plugin "gatsby-plugin-client-only-paths" found invalid prefix pattern: ${prefix}`
    )
  }
}

exports.onCreatePage = ({ page, store, actions }) => {
  const prefixes = ['/zombie/*']
  const { createPage } = actions
  const re = {}
  prefixes.forEach(validatePrefixEntry)

  return new Promise(resolve => {
    // Don't set matchPath again if it's already been set.
    if (page.matchPath || page.path.match(/dev-404-page/)) {
      return resolve()
    }

    prefixes.some(prefix => {
      if (!re[prefix]) {
        // Remove the * from the prefix and memoize
        const trimmedPrefix = prefix.replace(/\*$/, ``)
        re[prefix] = new RegExp(`^${trimmedPrefix}`)
      }

      // Ensure that the path ends in a trailing slash, since it can be removed.
      const path = page.path.match(/\/$/) ? page.path : `${page.path}/`

      if (path.match(re[prefix])) {
        page.matchPath = prefix.replace(/\*$/, `*`)
        createPage(page)
        return true
      }

      return false
    })

    return resolve()
  })
}
