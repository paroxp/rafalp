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
        $(document).trigger('app::run')
    }
}

export default App;