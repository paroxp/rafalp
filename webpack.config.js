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
            }
        ]
    }
};