module.exports = function () {
    var paths = {
            bower: './bower_components',
            root: '../'
        },
        fonts = '{ttf,woff,woff2,eof,eot,svg,otf}',
        config = {
            copy: {
                'font-awesome': {
                    destination: '../fonts/font-awesome',
                    source: paths.bower + '/font-awesome/fonts/**/*.' + fonts
                }
            },
            paths: paths,
            sass: {
                configuration: {
                    includePaths: [
                        './bower_components/bourbon/app/assets/stylesheets',
                        './bower_components/font-awesome/scss',
                        './bower_components/susy/sass'
                    ],
                    outputStyle: 'compressed'
                },
                destination: '../css',
                source: [
                    './scss/**/*.scss'
                ]
            },
            uglify: {
                configuration: {},
                destination: '../js',
                source: [
                    './js/**/*.js'
                ]
            }

        };

    return config;
}();