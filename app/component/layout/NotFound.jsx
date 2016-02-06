import React from 'react';

class NotFound extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <main role="main" className="not-found">
                <h1>Oops!</h1>
                <p>Looks like you're lost...</p>
            </main>
        );
    }
}

export default NotFound;
