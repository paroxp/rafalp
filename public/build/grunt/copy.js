module.exports = {
    fontawesome: {
        files: [
            {
                expand: true,
                flatten: true,
                src: ['bower_components/font-awesome/fonts/**'],
                dest: '../fonts/',
                filter: 'isFile'
            }
        ]
    }
};