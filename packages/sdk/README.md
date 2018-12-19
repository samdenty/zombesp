## Usage in browser

Add the following to webpack config:

```js
plugins: [
    ..., // any existing plugins that you already have
    new webpack.NormalModuleReplacementPlugin(/typeorm$/, function (result) {
        result.request = result.request.replace(/typeorm/, "typeorm/browser");
    }),
    new webpack.ProvidePlugin({
      'window.SQL': 'sql.js/js/sql.js'
    })
],
externals: [
  {fs: true}
]
```
