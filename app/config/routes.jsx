import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import About from '../component/about/About.jsx';
import App from '../component/app.jsx';
import Article from '../component/journal/Article.jsx';
import Contact from '../component/contact/Contact.jsx';
import Home from '../component/home/Home.jsx';
import Journal from '../component/journal/Journal.jsx';
import NotFound from '../component/layout/NotFound.jsx';

var routes = (
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="about" component={About}/>
            <Route path="contact" component={Contact}/>
            <Route path="journal" component={Journal}>
                <Route path="journal/:slug" component={Article}/>
            </Route>
            <Route name="404" path="*" component={NotFound}/>
        </Route>
    </Router>
);

export default routes;