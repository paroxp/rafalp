import view from '../config/view.jsx';

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