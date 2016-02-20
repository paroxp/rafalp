import React from 'react';
import request from 'superagent';
import {render} from 'react-dom';
import Footer from '../layout/Footer.jsx';
import Header from '../layout/Header.jsx';
import NotFound from '../layout/NotFound.jsx';

class Journal extends React.Component {
    constructor() {
        super();

        this.state = {
            articles: {}
        };

        this.getArticles();
    }

    getArticles() {
        request
            .get('http://localhost:8080/article')
            .on('error', failure)
            .end(success.bind(this));

        /////////////

        function success(error, response) {
            if (error) {
                return failure(error);
            }

            this.state.articles = response.body;
        }

        function failure(error) {
            return render(
                <div>
                    <Header />
                    <NotFound />
                    <Footer />
                </div>, document.getElementById('Application'));
        }
    }

    render() {
        return (
            <main role="main" className="blog">
                ...
            </main>
        );
    }
}

export default Journal;
