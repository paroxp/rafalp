class View {
    static render(template, data = {}) {
        let current = document.querySelector('.current-template');

        current.insertAdjacentHTML('afterend', template);
    }
}

export default View;