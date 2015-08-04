module.exports = {
    plugins: {
        dest: 'js/plugins.js',
        cssDest: 'scss/_plugins.scss',
        exclude: ['susy', 'bourbon'],
        dependencies: {

        },
        mainFiles: {
            'font-awesome': ['css/font-awesome.css']
        },
        bowerOptions: {
            relative: false
        }
    }
};