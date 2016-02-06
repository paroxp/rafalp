module.exports = {
    entry: {
        main: [
            './main.jsx'
        ]
    },
    output: {
        filename: '[name].js',
        path: './dist'
    },
    module: {
        loaders: [,
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
                loaders: ['style', 'css', 'sass']
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
    sassLoader: {
        includePaths: [
            './node_modules/bourbon/app/assets/stylesheets',
            './node_modules/font-awesome/scss',
            './node_modules/susy/sass'
        ]
    }
};