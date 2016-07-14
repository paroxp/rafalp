class Request {
    /**
     * Call defined endpoint with specific method and list of arguments.
     *
     * @param method
     * @param url
     * @param args
     * @returns {Promise}
     */
    static call(method = 'GET', url = '/', args = null) {
        return new Promise(makeCall);

        ////////////

        function makeCall(resolve, reject) {
            let client = new XMLHttpRequest();

            client.open(method, url, true);
            client.send(args);

            client.onload = () => {
                if (client.status >= 200 && client.status < 400) {
                    resolve({data: JSON.parse(client.response), code: client.status});
                } else {
                    reject({data: JSON.parse(client.response), code: client.status});
                }
            };

            client.onerror = () => {
                reject({data: JSON.parse(client.response), code: client.status});
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