class Selector {
    /**
     * Find any element matching the handle.
     *
     * @param handle
     */
    constructor(handle = '') {
        this.handle = handle;
        this.elements = document.querySelectorAll(handle);
    }

    /**
     * Setup event listener for each of obtained elements.
     *
     * @param event
     * @param callback
     */
    on(event, callback) {
        if (!this.elements.length) {
            return;
        }

        for (let element of this.elements) {
            element.addEventListener(event, callback);
        }
    }
}

function $(handle) {
    return new Selector(handle);
}

export default Selector;
export default $;