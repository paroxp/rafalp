class Selector {
    /**
     * Add specific class to the dom element.
     *
     * @param className
     */
    addClass(className) {
        this.assure((element) => {
            let classes = element.className === undefined ? [] : element.className.split(' ');

            classes.push(className);

            element.className = classes.join(' ');
        });

        return this;
    }

    /**
     * Add specific syntax after the selected elements.
     *
     * @param syntax
     */
    after(syntax) {
        this.assure((element) => element.insertAdjacentHTML('afterend', syntax));

        return this;
    }

    /**
     * Append new syntax to the element.
     *
     * @param syntax
     * @returns {Selector}
     */
    append(syntax) {
        this.assure((element) => element.appendChild(syntax));

        return this;
    }

    /**
     * Make a run for each element.
     *
     * @param action
     * @returns {*}
     */
    assure(action) {
        if (!this.elements.length) {
            return;
        }

        for (let element of this.elements) {
            action(element);
        }
    }

    /**
     * Set specific attribute and value, to an element.
     *
     * @param attribute
     * @param value
     * @returns {*}
     */
    attr(attribute, value = undefined) {
        if (value === undefined) {
            return this.elements[0].getAttribute(attribute);
        } else if (value) {
            this.assure((element) => element.setAttribute(attribute, value));
        } else {
            this.assure((element) => element.removeAttribute(attribute, value));
        }

        return this;
    }

    /**
     * Get children of specific type.
     *
     * @param handle
     * @returns {*}
     */
    children(handle) {
        let children = new Selector();

        this.assure((element) => children.elements.concat(element.querySelectorAll(handle)));

        return children;
    }

    /**
     * Find any element matching the handle.
     *
     * @param handle
     */
    constructor(handle = null) {
        if (handle) {
            this.elements = document.querySelectorAll(handle);
        } else {
            this.elements = [];
        }
    }

    /**
     * Return the next sibling for each obtained element.
     *
     * @returns {*}
     */
    next() {
        let siblings = new Selector();

        this.assure((element) => siblings.elements.push(element.nextSibling));

        return siblings;
    }

    /**
     * Setup event listener for each of obtained elements.
     *
     * @param eventName
     * @param target
     * @param callback
     */
    on(eventName, target, callback = null) {
        let live = callback ? true : false;

        if (!live) {
            callback = target;
            target = undefined;

            this.assure((element) => listen(element, callback));
        } else {
            listen(document, liveEvent);
        }

        return this;

        ////////////

        /**
         * Listen to the event on given object, calling specific function.
         *
         * @param object
         * @param func
         */
        function listen(object, func) {
            if (object.addEventListener) {
                object.addEventListener(eventName, func, false)
            } else {
                object.attachEvent('on' + eventName, func);
            }
        }

        /**
         * Perform the live event.
         *
         * @param event
         */
        function liveEvent(event) {
            let elements = document.querySelectorAll(target);

            if (elements) {
                let targetElement = event.target,
                    index = -1;

                while (targetElement && ((index = Array.prototype.indexOf.call(elements, targetElement)) === -1)) {
                    targetElement = targetElement.parentElement;
                }

                if (index > -1) {
                    callback.call(targetElement, event);
                }
            }
        }
    }

    /**
     * Check if the element is ready.
     *
     * @param callback
     */
    ready(callback) {
        this.assure((element) => {
            if (element.readyState != 'loading'){
                callback();
            } else {
                element.addEventListener('DOMContentLoaded', callback);
            }
        });

        return this;
    }

    /**
     * Ability to remove the element.
     */
    remove() {
        this.assure((element) => element.parentNode.removeChild(element));

        return this;
    }

    /**
     * Ability to remove a class from the dom element.
     *
     * @param className
     */
    removeClass(className) {
        this.assure((element) => {
            let classes = element.className === undefined ? [] : element.className.split(' '),
                index = classes.indexOf(className);

            if (index >= 0) {
                classes.splice(index, 1);

                element.className = classes.join(' ');
            }
        });

        return this;
    }
}

/**
 * Wrapper arount the Selector class.
 *
 * @param handle
 * @returns {Selector}
 */
function $(handle) {
    if (typeof handle === 'object') {
        let element = new Selector();

        element.elements.push(handle);

        return element;
    }

    return new Selector(handle);
}

export default $;