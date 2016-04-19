var config = {
    /**
     * Define routes of the front end application.
     */
    routes: {
        "/": {
            "action": "index",
            "controller": "Main"
        },
        "/test": {
            "action": "test",
            "controller": "Main"
        }
    }
};

var Application = {
    Controller: {
        Main: {
            index: function () {
                return Application.response.view('', {});
            }
        }
    },

    event: {
        /**
         * Redirect application to different view.
         *
         * @param event
         * @returns {*|string}
         */
        redirect: function (event) {
            var url = event.target.getAttribute('href');

            event.preventDefault();

            return Application.Router.goTo(url);
        }
    },

    response: {
        view: function (template, variables) {

        }
    },

    Router: {
        /**
         * Parse the hash path to be used throughout the system.
         *
         * @returns {string}
         */
        getPath: function () {
            var hash = window.location.hash === '' ? '#/' : window.location.hash;

            return hash.substr(1);
        },

        /**
         * Change the hash url on the fly.
         *
         * @param path
         * @returns {string}
         */
        goTo: function (path) {
            return window.location.hash = '#' + path;
        },

        /**
         * Run route specific method.
         *
         * @returns {*}
         */
        run: function () {
            var action, controller,
                Route = config.routes[Application.Router.getPath()],
                method = (Route.method || 'GET').toUpperCase();

            try {
                controller = Application.Controller[Route.controller];
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
};
