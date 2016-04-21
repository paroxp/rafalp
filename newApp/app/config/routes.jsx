import Main from '../handler/main.jsx';

let routes = {
    "/": {
        "action": "index",
        "handler": Main
    },
    "/test": {
        "action": "test",
        "handler": Main
    }
};

export default routes;