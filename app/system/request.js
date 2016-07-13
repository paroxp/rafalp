class Request {
    /**
     * Call defined endpoint with specific method and list of arguments.
     *
     * @param method
     * @param url
     * @param args
     * @returns {Promise}
     */
    static call(method = 'GET', url = '/', args = {}) {
        return new Promise(makeCall);

        ////////////

        function makeCall(resolve, reject) {
            let client = new XMLHttpRequest(),
                uri = url;

            if (args && (method === 'POST' || method === 'PUT')) {
                let argcount = 0;
                uri += '?';

                for (var key in args) {
                    if (args.hasOwnProperty(key)) {
                        if (argcount++) {
                            uri += '&';
                        }

                        uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
                    }
                }
            }

            client.open(method, uri);
            client.send();

            client.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(this.response);
                } else {
                    reject(this.response);
                }
            };

            client.onerror = function () {
                reject(this.response);
            };
        }
    }

    /**
     * Make the DELETE request to defined endpoint with given arguments.
     *
     * @param url
     * @param args
     * @returns {Promise}
     */
    static delete(url, args) {
        return Request.call('DELETE', url, args);
    }

    /**
     * Make the GET request to defined endpoint with given arguments.
     *
     * @param url
     * @param args
     * @returns {*|Request}
     */
    static get(url, args) {
        return request.call('GET', url, args);
    }

    /**
     * Make the PATCH request to defined endpoint with given arguments.
     *
     * @param url
     * @param args
     * @returns {Promise}
     */
    static patch(url, args) {
        return Request.call('PATCH', url, args);
    }

    /**
     * Make the POST request to defined endpoint with given arguments.
     *
     * @param url
     * @param args
     * @returns {Promise}
     */
    static post(url, args) {
        return Request.call('POST', url, args);
    }

    /**
     * Make the PUT request to defined endpoint with given arguments.
     *
     * @param url
     * @param args
     * @returns {Promise}
     */
    static put(url, args) {
        return Request.call('PUT', url, args);
    }
}

export default Request;