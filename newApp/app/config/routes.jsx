import Main from '../handler/main.jsx';

let routes = {
    "/": {
        "action": "index",
        "controller": Main
    },
    "/test": {
        "action": "test",
        "controller": Main
    }
};

export default routes;