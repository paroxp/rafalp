import Aviator from 'aviator';
import Main from '../handler/main';

let routes = {
    target: new Main,
    '/': 'index',
    '/about': 'about',
    '/contact': 'contact',
    notFound: 'notFound'
};

export default routes;