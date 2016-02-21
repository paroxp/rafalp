import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

import request from 'superagent';
import moment from 'moment';

import Footer from '../layout/Footer.jsx';
import Header from '../layout/Header.jsx';
import NotFound from '../layout/NotFound.jsx';

class Journal extends React.Component {
    componentDidMount() {
        request
            .get('http://localhost:8080/article')
            .on('error', failure)
            .end(success.bind(this));

        /////////////

        function success(error, response) {
            if (error) {
                return failure(error);
            }

            this.setState({
                articles: response.body
            });
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

    componentWillUnmount() {
        //
    }

    constructor() {
        super();

        this.state = {
            articles: {
                data: []
            }
        };
    }

    render() {
        return (
            <main role="main" className="blog">
                {this.state.articles.data.map(function (article, key) {
                    return (
                        <article key={key}>
                            <header>
                                <h2><Link to={`/journal/${article.slug}`}>{article.title}</Link></h2>
                            </header>

                            <p>{article.synopsis}</p>

                            <footer>
                                <time dateTime={article.created_at}>
                                    {moment(article.created_at, 'YYYY-MM-DD HH:mm:ss').format('MMMM Do, YYYY')}
                                </time>
                            </footer>
                        </article>
                    );
                })}
            </main>
        );
    }
}

export default Journal;
