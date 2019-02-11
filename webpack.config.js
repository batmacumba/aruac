//webpack.config.js
var path = require('path');
var webpack = require('webpack');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    plugins: [
        new CompressionPlugin({
          algorithm: 'gzip',
          deleteOriginalAssets: true
        })
    ],
    devtool: 'cheap-module-source-map',
    entry: './client/index.js',
    output: {
      path: path.join(__dirname, 'client/public/js/'),
      filename: 'bundle.js',
    },
    mode: 'production',
     optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false, // set to true if you want JS source maps
            }),
            new webpack.optimize.OccurrenceOrderPlugin(),

        ],

    },
    module: {
        rules: [{
                  test: /.jsx?$/,
                  loader: 'babel-loader',
                  exclude: /node_modules/,
                  query: {
                  presets: ['@babel/preset-env', '@babel/preset-react']
                  }
                  },
                  {
                  test: /\.css$/,
                  loader: "style-loader!css-loader"
                  }]
    },
}

//devtool: "#eval-source-map",
