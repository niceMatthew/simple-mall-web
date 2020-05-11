const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: process.env.NODE_ENV == "development" ? "development" : "production", // 默认是开发模式
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    devServer: {
        hot: true,
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: { // browserHistory, 刷新会报404, 自动重定向到index.html
            index: './index.html'
        }
    },
    resolve: {
        alias : {
            "@": path.resolve(__dirname, 'src'),
            "~": path.resolve(__dirname, "node_modules")
        },
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        "compact": false,
                        "plugins": [
                            ["import", { "libraryName": "antd", "libraryDirectory": "lib"}, "antd"]
                        ]
                    }
                }],           
            },
            {
                enforce: 'pre',
                test:/\.(j|t)sx?$/,
                loader: 'source-map-loader'
            },
            {
                test: /\.css$/,
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecesion: 8
                        }
                     }]
            },
            {
                test: /\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecesion: 8
                        }
                    },{
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true
                        }
                    }]
            },
            {
                test: /.(jpg|png|gif|svg|jpeg)$/,
                use: ['url-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // 热更新插件
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.DllReferencePlugin({
        //     manifest: path.join(__dirname, 'vendor', 'react.manifest.json')
        // }),
        // new CopyWebpackPlugin([{
        //     from: path.join(__dirname,'vendor'),//静态资源目录源地址
        //     to:'./vendor' //目标地址，相对于output的path目录
        // }]),
        new webpack.NamedModulesPlugin() // 执行热替换时打印模块名字
    ],
    performance: {
        hints: false
    }
}