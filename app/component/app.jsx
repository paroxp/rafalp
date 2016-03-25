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
            <ReactCSSTransitionGroup
                component='div'
                className='application-wrapper'
                transitionName='fade'
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
            >
                <Header />

                {React.cloneElement(this.props.children, {
                    key: this.props.location.pathname
                })}

                <Footer />
            </ReactCSSTransitionGroup>
        );
    }
}

export default App;
