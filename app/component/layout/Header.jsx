import React from 'react';
import {Link} from 'react-router';

class Header extends React.Component {
    constructor() {
        super();

        this.state = {
            current: 'home',
            expanded: false
        };
    }

    expandMenu(event) {
        this.setState({expanded: !this.state.expanded});

        return false;
    }

    isCurrent(route) {
        if (this.state.current === route) {
            return 'active';
        }

        return '';
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
                            <Link to="/" className={this.isCurrent('home')}>Home</Link>
                        </li>
                        <li>
                            <Link to="/blog" className={this.isCurrent('journal')}>Journal</Link>
                        </li>
                        <li>
                            <Link to="/about" className={this.isCurrent('about')}>About</Link>
                        </li>
                        <li>
                            <Link to="/contact" className={this.isCurrent('contact')}>Contact</Link>
                        </li>
                    </ul>
                </nav>

                <a href="#" onClick={this.expandMenu.bind(this)}>Menu</a>
            </header>
        );
    }

    setCurrent(route) {
        this.setState({current: route});
    }
}

export default Header;
