import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import About from '../component/about/About.jsx';
import App from '../component/app.jsx';
import Article from '../component/journal/Article.jsx';
import Contact from '../component/contact/Contact.jsx';
import Home from '../component/home/Home.jsx';
import Journal from '../component/journal/Journal.jsx';
import NotFound from '../component/layout/NotFound.jsx';

let routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute name="home" component={Home}/>
            <Route name="about" path="about" component={About}/>
            <Route name="contact" path="contact" component={Contact}/>
            <Route name="404" path="*" component={NotFound}/>
        </Route>
    </Router>
);

export default routes;