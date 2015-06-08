var webpack = require('webpack');

module.exports = {
  entry: {
    todo:[
      'webpack-dev-server/client?http://localhost:9000',
      'webpack/hot/dev-server',
      './demo/todo/index.js'
    ]
  },
  output: {
    path: __dirname + '/public/',
    filename: '[name].js',
    publicPath: '/demo/public/'
  },
  externals : [{
  }],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.SourceMapDevToolPlugin({})
  ],
  resolve: {
    extensions: ['', '.js'],
    alias : {
      //"jQuery" : __dirname+"/src/vendor/jquery.min"
    }
  },
  module: {
    loaders: [
      { test: /\.css/,loader: "style-loader!css-loader"},
      { test: /\.less$/,loader: "style-loader!css-loader!less-loader"},
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.svg$/,  loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
      { test: /\.json/,  loader: "json-loader" }
    ]
  }
};
