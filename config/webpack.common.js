const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const helpers = require('./helpers');

// 获取命令行设置的环境变量
var env = process.env.NODE_ENV;
var isProd = env === "prod";

module.exports={
    entry:{
        'main':'./src/index.js'
    },
    //查找依赖文件路径
    resolve: {
        //导入的时候不用写拓展名
        //Can ignore extensions when importing
        extensions: ['.ts', '.js', '.json', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
    // 监听文件变化，当它们修改后会重新编译
    watchOptions: {
        // 排除一些巨大的文件夹
        ignored: /node_modules/,
        //防止重复保存频繁重新编译,300ms内重复保存不打包
        aggregateTimeout: 300,
        //每秒询问的文件变更的次数(监听)
        poll: 1000  
    },
    // 指定各种loader
    module:{
        rules:[
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    hotReload: true // 打开热重载
                }
            },
            {
                test: /\.css$/,
                include: [
                    helpers.root('src', 'app')
                ],
                use:[
                    "style-loader",
                    "vue-style-loader",
                    "css-loader",
                ]
            },
            {
                test: /\.css$/,
                exclude: [
                    helpers.root('src', 'app')
                ],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.scss$/,
                exclude: [
                    helpers.root('src', 'app')
                ],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader' },
                        { loader: 'sass-loader' }
                    ]
                })
            },
            {
                test: /\.scss$/,
                include: [
                    helpers.root('src', 'app')
                ],
                use: [
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.(svg|woff|woff2|ttf|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/fonts/[name].[hash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: 'assets/images/[name].[hash].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            title: "webpack4 + vue2",
            filename:'index.html',
            inject:true,
            chunks:['main']
        }),
        //直接复制一些静态资源
        //copy some static resource
        new CopyWebpackPlugin([
            {
                from: helpers.root('src', 'favicon.ico'),
                to: helpers.root('dist', 'favicon.ico'),
                toType:'file'
            }
        ]),
        // vue-loader v1.5以上版本,如果不加则报错: vue-loader was used without the corresponding plugin.
        new VueLoaderPlugin()
    ]

}