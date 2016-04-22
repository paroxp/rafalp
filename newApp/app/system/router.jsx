import routes from '../config/routes.jsx';

class Router {
    /**
     * Parse the hash path to be used throughout the system.
     *
     * @returns {string}
     */
    getPath() {
        var hash = window.location.hash === '' ? '#/' : window.location.hash;

        return hash.substr(1);
    }

    /**
     * Change the hash url on the fly.
     *
     * @param path
     * @returns {*}
     */
    static goTo(path) {
        window.location.hash = '#' + path;

        let router = new Router;

        return router.run();
    }

    /**
     * Attempt to throw a notFound response.
     *
     * @returns {*}
     */
    notFound() {
        let action, handler;

        try {
            handler = new routes.notFound.handler;
            action = handler[routes.notFound.action];
        } catch ($e) {
            console.error('Unable to obtain notFound handler.');
        }

        return action();
    }

    /**
     * Run route specific method.
     *
     * @returns {*}
     */
    run() {
        let action, handler,
            Route = routes[this.getPath()];

        try {
            handler = new Route.handler;
        } catch (e) {
            console.error('Could not find the "' + Route.handler + '" controller.');
            return this.notFound();
        }

        try {
            action = handler[Route.action];
        } catch (e) {
            console.error('The "' + Route.handler + '::' + Route.action + '" method is not defined.');
            return this.notFound();
        }

        return action();
    }
}

export default Router;
