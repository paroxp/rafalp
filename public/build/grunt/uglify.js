module.exports = {
    options: {
        mangle: false
    },
    app: {
        files: {
            '../js/app.min.js': [
                'js/plugins.js',

                // Build up the application.
                'js/framework/init.js',
                'js/framework/core.js',

                // Single modules.
                'js/framework/attribute.js',
                'js/framework/css.js',
                'js/framework/element.js',
                'js/framework/event.js',
                'js/framework/fade.js',

                // Wrap it up.
                'js/framework/application.js',

                'js/app.js'
            ]
        }
    }
};