var app = app || {};

// Extend our application with underscore library.
_.extend(app, _);

app.extend(app, {
    /**
     * Name of the application.
     */
    author: 'Rafał Proszowski',

    /**
     * Store the description just in case we may need it.
     */
    description: 'The JavaScript application for Rafal\'s Home Page.',

    /**
     * Author's homepage.
     */
    homepage: 'https://rafalp.com/',

    /**
     * Transform underscore version, for the peace of mind.
     */
    underscore: app.VERSION,

    /**
     * Application version for future reference...
     */
    version: '1.0.0'
});

// Ignore underscore initial version.
delete app.VERSION;