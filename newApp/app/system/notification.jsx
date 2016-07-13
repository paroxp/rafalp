import notification from '../config/notification';
import Security from './security';

class Notification {
    /**
     * Construct new notification.
     *
     * @param type
     * @param content
     * @param title
     * @param expiry
     */
    constructor(type, content, title = null, expiry = null) {
        this.id = Security.guid();
        this.content = content;
        this.className = notification.className + ' ' + notification[type].className;
        this.expiry = expiry || notification.expiry;
        this.title = title || notification.title;
        this.type = type;
    }

    /**
     * Generate the HTML syntax for the current notification.
     *
     * @returns string
     */
    getSyntax() {
        for (let i = 0, keys = Object.keys(this); i < keys.length; i++) {
            notification.template.replace(/{keys[i]}/g, this[keys[i]]);
        }

        return notification.template;
    }
}

export default Notification;