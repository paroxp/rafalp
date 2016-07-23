import Aviator from 'aviator';
import routes from '../config/routes';

class Router {
    /**
     * Change the hash url on the fly.
     *
     * @param path
     * @returns {*}
     */
    static goTo(path) {
        return Aviator.navigate(path);
    }

    /**
     * Run route specific method.
     *
     * @returns {*}
     */
    run() {
        Aviator.setRoutes(routes);

        return Aviator.dispatch();
    }
}

export default Router;
