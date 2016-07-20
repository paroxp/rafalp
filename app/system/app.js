import Router from './router';
import $ from '../system/selector';

class App {
    /**
     * Bootstrap new application.
     */
    constructor() {
        window.app = {
            event: {},
            notification: {}
        };

        this.router = new Router();

        this.run();
    }

    /**
     * Run the application.
     */
    run() {
        this.startOfflineMode();

        $(document).trigger('app::run')
    }

    /**
     * Setup the Offline mode for the website.
     */
    startOfflineMode() {
        UpUp.start({
            'content-url': 'index.html',
            'assets': [
                '/img/favicon/favicon.ico',
                '/js/main.js',
                '/fonts/fontawesome-webfont.eot',
                '/fonts/fontawesome-webfont.svg',
                '/fonts/fontawesome-webfont.ttf',
                '/fonts/fontawesome-webfont.woff',
                '/fonts/fontawesome-webfont.woff2'
            ]
        });
    }
}

export default App;