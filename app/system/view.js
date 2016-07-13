import view from '../config/view';

class View {
    /**
     * Render given template on the page.
     *
     * @param template
     */
    static render(template) {
        view.event(template);
    }
}

export default View;