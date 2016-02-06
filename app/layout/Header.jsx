import React from 'react';

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
            <div>
                <figure>
                    <img src="img/logo.svg" alt="Logo" />
                </figure>

                <nav className={expandedClass}>
                    <ul>
                        <li>
                            <a href="/" className={this.isCurrent('home')}>Home</a>
                        </li>
                        <li>
                            <a href="/blog" className={this.isCurrent('journal')}>Journal</a>
                        </li>
                        <li>
                            <a href="/about" className={this.isCurrent('about')}>About</a>
                        </li>
                        <li>
                            <a href="/contact" className={this.isCurrent('contact')}>Contact</a>
                        </li>
                    </ul>
                </nav>

                <a href="#" onClick={this.expandMenu.bind(this)}>Menu</a>
            </div>
        );
    }

    setCurrent(route) {
        this.setState({current: route});
    }
}

export default Header;
