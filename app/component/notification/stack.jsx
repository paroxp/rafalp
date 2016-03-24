import React from 'react';
import {render} from 'react-dom';

class Stack extends React.Component {
    addNotification(notification) {
        this.state.stack.push(notification);
    }

    constructor() {
        super();

        this.state = {
            stack: []
        };
    }

    render() {
        return (
            <section>
                {this.state.stack.map(function (notification) {
                    return (
                        <div key={notification.id}>
                            <h3>{notification.title}</h3>
                            <p>{notification.message}</p>
                        </div>
                    );
                })}
            </section>
        );
    }
}

export default Stack;
