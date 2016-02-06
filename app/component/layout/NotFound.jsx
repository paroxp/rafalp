import React from 'react';
import Header from '../layout/Header.jsx';

class NotFound extends React.Component {
    constructor() {
        super();

        Header().setCurrent('404');
    }

    render() {
        return (
            <main role="main">
                <h1>Oops!</h1>
                <p>Looks like you're lost...</p>
            </main>
        );
    }
}

export default NotFound;
