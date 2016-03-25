import React from 'react';
import {render} from 'react-dom';

import request from 'superagent';
import moment from 'moment';

import Footer from '../layout/Footer.jsx';
import Header from '../layout/Header.jsx';
import NotFound from '../layout/NotFound.jsx';

class Article extends React.Component {
    componentDidMount() {
        request
            .get('/api/article/' + this.props.params.slug)
            .on('error', failure)
            .end(success.bind(this));

        /////////////

        function success(error, response) {
            if (error) {
                return failure(error);
            }

            this.setState({
                article: response.body
            });
        }

        function failure(response) {
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
            article: {}
        };
    }

    render() {
        return (
            <main role="main" className="blog article">
                <article>
                    <header>
                        <h2>{this.state.article.title}</h2>
                    </header>

                    {this.state.article.content}

                    <footer>
                        <time dateTime={this.state.article.created_at}>
                            {moment(this.state.article.created_at, 'YYYY-MM-DD HH:mm:ss').format('MMMM Do, YYYY')}
                        </time>
                    </footer>
                </article>
            </main>
        );
    }
}

export default Article;
