## Usage in browser

1.  Install `reflect-metadata` shim and import it somewhere in the global place of your app (for example in `app.ts`):

    ```
    import "reflect-metadata";
    ```

2.  Add the following to webpack config:

    ```js
    plugins: [
        ..., // any existing plugins that you already have
        new webpack.NormalModuleReplacementPlugin(/typeorm$/, function (result) {
            result.request = result.request.replace(/typeorm/, "typeorm/browser");
        }),
        new webpack.NormalModuleReplacementPlugin(/type-graphql$/, function (result) {
            result.request = result.request.replace(/type-graphql/, "type-graphql/browser-shim");
        }),
        new webpack.ProvidePlugin({
          'window.SQL': 'sql.js/js/sql.js'
        })
    ],
    externals: [
      {fs: true}
    ]
    ```
