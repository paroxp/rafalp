import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Header from './layout/Header.jsx';
import Footer from './layout/Footer.jsx';

class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Header />

                {this.props.children}

                <Footer />
            </div>
        );
    }
}

export default App;
