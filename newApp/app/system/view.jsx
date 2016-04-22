import $ from '../system/selector.jsx';
import view from '../config/view.jsx';

class View {
    /**
     * Render given template on the page.
     * 
     * @param template
     */
    static render(template) {
        let current = $(view.container);

        current.addClass(view.leaveClass);

        View.replace(current, template);
    }

    /**
     * Replace existing container with the new one.
     * 
     * @param current
     * @param template
     */
    static replace(current, template) {
        current.after(template);

        let next = $(view.container + ' + *');

        next.addClass(view.enterClass);

        setTimeout(() => current.remove() && next.removeClass(view.enterClass), 1000);
    }
}

export default View;