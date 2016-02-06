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

                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="fade"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {React.cloneElement(this.props.children, {
                        key: this.props.location.pathname
                    })}
                </ReactCSSTransitionGroup>

                <Footer />
            </div>
        );
    }
}

export default App;
