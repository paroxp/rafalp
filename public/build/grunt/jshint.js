module.exports = {
    all: [
        'Gruntfile.js',
        'grunt/**/*.js',
        'js/**/*.js',

        // Make sure we won't check some files.
        '!js/**/*.min.js',
        '!js/**/ie.js',
        '!js/**/plugins.js'
    ]
};