module.exports = {
    options: {
        includePaths: [
            'bower_components/bourbon/app/assets/stylesheets',
            'bower_components/susy/sass'
        ],
        outputStyle: 'compressed'
    },
    app: {
        files: {
            '../css/app.min.css': 'scss/app.scss',
            '../css/initial.min.css': 'scss/initial.scss'
        }
    }
};