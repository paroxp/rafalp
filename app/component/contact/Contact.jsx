import React from 'react';

import request from 'superagent';

import Notification from '../notification/notification.jsx';
import Stack from '../notification/stack.jsx';

class Contact extends React.Component {
    constructor() {
        super();

        this.state = {
            contact: {
                name: '',
                email: '',
                message: '',
                url: null
            },
            stack: new Stack()
        };
    }

    changeValue(event) {
        let field = event.target.getAttribute('name');

        this.state.contact[field] = event.target.value;
    }

    render() {
        return (
            <main role="main" className="contact">
                <aside>
                    <p>Hey, why don't you drop me a line, say hello? Maybe, I could help you out somehow?</p>
                    <p>I will get back to you, (at some point), I promise.</p>
                    <p>Get in touch!</p>
                </aside>

                <form method="post" onSubmit={this.submit.bind(this)}>
                    <label>
                        Name
                        <input type="text" name="name" onChange={this.changeValue.bind(this)}/>
                    </label>
                    <label>
                        Email
                        <input type="email" name="email" onChange={this.changeValue.bind(this)}/>
                    </label>
                    <label>
                        Message
                        <textarea name="message" onChange={this.changeValue.bind(this)}/>
                    </label>

                    <input type="hidden" name="url" onChange={this.changeValue.bind(this)}/>

                    <button type="submit">Submit</button>
                </form>

                <Stack />
            </main>
        );
    }

    submit(event) {
        event.preventDefault();

        var state = this.state;

        request
            .post('http://localhost:8080/contact')
            .send(this.state.contact)
            .set('Accept', 'application/json')
            .on('error', failure)
            .end(success);

        return false;

        /////////////

        function success(error, response) {
            if (error) {
                return failure(response);
            }

            console.log(error, response);
        }

        function failure(response) {
            for (let i = 0; i < Object.keys(response.body).length; i++) {
                let key = Object.keys(response.body)[i];

                response.body[key].map(function (error) {
                    state.stack.addNotification(
                        new Notification('error', 'Validation Error', error)
                    );
                });
            }
        }
    }
}

export default Contact;
