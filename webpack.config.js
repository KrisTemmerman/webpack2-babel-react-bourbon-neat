/*
    ./webpack.config.js
*/
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';
const bourbon = require('node-bourbon').includePaths;
const neat = require('node-neat').includePaths;
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './client/index.html',
    filename: 'index.html',
    inject: 'body'
})
console.log('ENVIRONMENT:  ' + process.env.NODE_ENV);
console.log('bourbon: ' + bourbon);


console.log(path.appSrc)
const plugins = PRODUCTION ? [
    new HtmlWebpackPlugin({
        title: 'PRODUCTION',
        filename: 'index.html',
        template: './client/index-template.html'
    }),
    new ExtractTextPlugin("main.css")
] : [
    HtmlWebpackPluginConfig,
    new ExtractTextPlugin("main.css")
]

const styleLoaders = [{
    loader: 'css-loader',
    options: {
        modules: true
    }
}, {
    loader: 'sass-loader',
    options: {
       includePaths: [neat, bourbon]
    }
}]


module.exports = {
    devtool: 'hidden-source-map',
    entry: './client/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    module: {
      rules:
        [
          {
             test: /\.js$/,
             use:[
                {
                  loader: 'babel-loader'
                }
             ],
            exclude: /node_modules/

          },
          {
             test: /\.jsx$/,
             use:[
                {
                  loader: 'babel-loader'
                }
             ],
            exclude: /node_modules/
          },
          {
             test: /\.scss$/,
             use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: styleLoaders
                }),
            exclude: /node_modules/
          }
         ]
    },
    plugins: plugins,
}