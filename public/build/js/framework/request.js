var app = app || {};

/**
 * request.js
 *
 * Functionality responsible for ajax communication.
 */
_.extend(app, {

    request: function (options) {
        var request = new XMLHttpRequest(),
            url = _.isString(options) ? options : (options.url || '/'),
            method = typeof options.method !== 'undefined' ? options.method.toUpperCase() : 'GET',
            headers = options.headers || {},
            data = options.headers || {},
            success = options.success || function (request) {},
            error = options.error || function (request) {};

        request.open(method, url, true);

        _.each(headers, function (value, key) {
            request.setRequestHeader(key, value);
        });

        request.onload = function () {
            return success(request);
        };

        request.onerror = function () {
            return error(request);
        };

        request.send(data);
    }

});
