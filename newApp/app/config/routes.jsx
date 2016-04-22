import Main from '../handler/main.jsx';

let routes = {
    '/': {
        'action': 'index',
        'handler': Main
    },
    '/about': {
        'action': 'about',
        'handler': Main
    },
    '/contact': {
        'action': 'contact',
        'handler': Main
    },
    'notFound': {
        'action': 'notFound',
        'handler': Main
    }
};

export default routes;