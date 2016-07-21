import view from '../config/view';
import $ from './selector';

class View {
    /**
     * Render given template on the page.
     *
     * @param template
     */
    static render(template) {
        $(document).trigger('view::render');
        view.event(template);
    }
}

export default View;