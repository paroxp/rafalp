/**
 * Clone the object into another one.
 *
 * @param object
 * @returns {*}
 */
export function clone(object) {
    // Handle string and number.
    if (typeof object === 'string' || typeof object === 'number') {
        return object.substr(0);
    }

    // Handle the 3 simple types, and null or undefined
    if (null == object || 'object' != typeof object) return object;

    // Handle Date
    if (object instanceof Date) {
        let copy = new Date();

        copy.setTime(object.getTime());

        return copy;
    }

    // Handle Array
    if (object instanceof Array) {
        let copy = [];

        for (let i = 0, len = object.length; i < len; i++) {
            copy[i] = clone(object[i]);
        }

        return copy;
    }

    // Handle Object
    if (object instanceof Object) {
        let copy = {};

        for (let attr in object) {
            if (object.hasOwnProperty(attr)) copy[attr] = clone(object[attr]);
        }

        return copy;
    }

    throw new Error("Unable to copy object! Its type isn't supported.");
}
