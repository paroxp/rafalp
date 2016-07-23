import * as common from './common';
import notification from '../config/notification';
import Security from './security';
import $ from './selector';

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
        this.className = notification.className;
        this.expiry = expiry || notification.expiry;
        this.title = title || notification.title;
        this.type = type;
        this.typeClass = notification[type].className;

        this.desolve = null;
        this.element = null;

        $(document).trigger('notification::create');

        this.fire();
    }

    /**
     * Fire the destroy event.
     */
    destroy() {
        let notification = this;

        if (notification.desolve !== null) {
            clearTimeout(notification.desolve);
        }

        return $(notification.element).trigger('notification::destroy');
    }

    /**
     * Fire the notification.
     */
    fire() {
        let holder = document.createElement('div');
        holder.innerHTML = this.getSyntax();

        $(notification.container).append(holder.firstChild);
        this.element = document.querySelector(notification.container).lastChild;

        window.app.notification[this.id] = this;

        this.setDesolver();

        $(this.element).trigger('notification::fire');
    }

    /**
     * Generate the HTML syntax for the current notification.
     *
     * @returns string
     */
    getSyntax() {
        let template = common.clone(notification.template);

        for (let i = 0, keys = Object.keys(this); i < keys.length; i++) {
            template = template.replace(new RegExp('{' + keys[i] + '}', 'g'), this[keys[i]]);
        }

        return template;
    }

    /**
     * Set the desolver to to destroy notification after the expiry date.
     */
    setDesolver() {
        let notification = this;

        if (notification.desolve !== null) {
            clearTimeout(notification.desolve);
        }

        notification.desolve = setTimeout(() => notification.destroy(), this.expiry * 1000);

        $(this.element).trigger('notification::reset');
    }
}

export default Notification;