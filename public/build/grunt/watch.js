module.exports = {
    options: {
        spawn: false,
        livereload: true
    },

    grunt: {
        files: ['Gruntfile.js', 'grunt/**/*.js', 'grunt/aliases.yaml'],
        options: {
            reload: true
        }
    },

    sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
    },

    js: {
        files: 'js/**/*.js',
        tasks: ['jshint', 'uglify']
    }
};