// 开发模式下的 webpack 配置
const webpack = require('webpack');
const webpackMerge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js')
var helpers = require('./helpers');

module.exports= webpackMerge(commonConfig,{
    mode: "development",
    output:{
        path: helpers.root('dist'),
        publicPath:'',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    plugins:[
        new ExtractTextPlugin('[name].css'),
    ],
    devServer:{
        historyApiFallback: true,
        host: '0.0.0.0',
        port: 8888,
        contentBase: './dist',
        inline: true
    }
})