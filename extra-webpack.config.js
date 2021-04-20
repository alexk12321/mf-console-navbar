const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;
const webpack = require('webpack');

module.exports = (angularWebpackConfig, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(angularWebpackConfig, options)
  // Feel free to modify this webpack config however you'd like to
  return {
    ...singleSpaWebpackConfig,
    output: {
      ...singleSpaWebpackConfig.output,
      jsonpFunction: 'navbarJsonpFunction',
      library: 'navbar'
    },
    plugins: [...(singleSpaWebpackConfig.plugins || []), new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en-gb/)]
  }
}
