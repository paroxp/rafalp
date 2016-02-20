import React from 'react';


class Contact extends React.Component {
    constructor() {
        super();

        this.state = {
            contact: {
                name: '',
                email: '',
                message: '',
                url: null
            }
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
            </main>
        );
    }

    submit(event) {
        event.preventDefault();

        fetch('http://localhost:8080/contact', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.contact)
        })
            .then(success, failure);

        return false;

        /////////////

        function success(response) {
            console.log(response);
        }

        function failure(response) {
            for (let i = 0; i < Object.keys(response.data).length; i++) {
                this.addNotification();
            }
        }
    }
}

export default Contact;
