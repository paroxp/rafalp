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
    goTo(path) {
        window.location.hash = '#' + path;

        return this.run();
    }

    /**
     * Run route specific method.
     *
     * @returns {*}
     */
    run() {
        let action, controller,
            Route = routes[this.getPath()],
            method = (Route.method || 'GET').toUpperCase();

        try {
            controller = new Route.controller;
        } catch (e) {
            console.error('Could not find the "' + Route.controller + '" controller.');
            return;
        }

        try {
            action = controller[Route.action];
        } catch (e) {
            console.error('The "' + Route.controller + '::' + Route.action + '" method is not defined.');
            return;
        }

        return action();
    }
}

export default Router;
