var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');

module.exports = {
    // devtool: 'cheap-module-source-map',
    entry: {
        initial: [
            './scss/initial.scss'
        ],
        main: [
            './app/main.jsx'
        ]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.scss$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /initial.scss$/,
                exclude: /(node_modules|bower_components)/,
                loader: ExtractTextPlugin.extract('style', 'css!sass')
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&minetype=application/font-woff&name=../fonts/[name].[ext]'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=../fonts/[name].[ext]'
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: './js'
    },
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: {
                baseDir: [
                    './'
                ]
            }
        }),
        new ExtractTextPlugin('../assets/css/[name].css', {
            allChunks: true,
            disable: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        })
    ],
    sassLoader: {
        includePaths: [
            './node_modules/bourbon/app/assets/stylesheets',
            './node_modules/font-awesome/scss',
            './node_modules/susy/sass'
        ]
    }
};