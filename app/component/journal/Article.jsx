import React from 'react';
import NotFound from '../layout/NotFound.jsx';
import {render} from 'react-dom';

class Article extends React.Component {
    constructor() {
        super();

        this.state = {
            article: {}
        };

        //this.getArticle();
    }

    getArticle() {
        fetch('http://localhost:8080/article/' + this.props.params.slug, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(success, failure);

        /////////////

        function success(response) {
            this.state.article = response.data;
        }

        function failure(response) {
            //return render(<NotFound />);
        }
    }

    render() {
        return (
            <main role="main" className="article">
                ...
            </main>
        );
    }
}

export default Article;
