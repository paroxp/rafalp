import React from 'react';
import {Link} from 'react-router';

class Header extends React.Component {
    constructor() {
        super();

        this.state = {
            expanded: false
        };
    }

    expandMenu(event) {
        event.preventDefault();

        this.setState({expanded: !this.state.expanded});

        return false;
    }

    render() {
        var expandedClass = this.state.expanded ? 'active' : '';

        return (
            <header role="banner">
                <figure>
                    <img src="img/logo.svg" alt="Logo" />
                </figure>

                <nav className={expandedClass}>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about" activeClassName="active">About</Link>
                        </li>
                        <li>
                            <Link to="/contact" activeClassName="active">Contact</Link>
                        </li>
                    </ul>
                </nav>

                <a href="#" onClick={this.expandMenu.bind(this)}>Menu</a>
            </header>
        );
    }
}

export default Header;
