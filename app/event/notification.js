import Base from './base';

class Notification extends Base {
    /**
     * Close the notification.
     *
     * @param event
     */
    static close(event) {
        window.app.notification[this.getAttribute('id')].destroy();
    }

    /**
     * Start removal process.
     *
     * @param event
     */
    static hide(event) {
        let element = this;

        element.style.opacity = 1;

        (function fade() {
            if ((element.style.opacity -= .1) < 0) {
                element.style.display = 'none';
            } else {
                window.requestAnimationFrame(fade);
            }
        })();

        setTimeout(() => element.parentNode.removeChild(element), 1000);
    }

    /**
     * Reset the notification.
     *
     * @param event
     */
    static reset(event) {
        event.target.style.opacity = 'inherit';
        event.target.style.display = 'inherit';

        window.app.notification[this.getAttribute('id')].setDesolver();
    }

    /**
     * Show the notification.
     * 
     * @param event
     */
    static show(event) {
        let element = this;

        element.style.opacity = 0;
        element.style.display = 'block';

        (function fade() {
            let val = parseFloat(element.style.opacity);

            if (!((val += .1) > 1)) {
                element.style.opacity = val;
                window.requestAnimationFrame(fade);
            }
        })();
    }
}

export default Notification;