import React from 'react';

class Menu extends React.Component {
    constructor() {
        super();

        this.state = {
            expanded: false
        };
    }

    expandMenu(event) {
        this.setState({expanded: !this.state.expanded});

        return false;
    }

    render() {
        var expandedClass = this.state.expanded ? 'active' : '';

        return (
            <nav class="{expandedClass}">
                <ul>
                    <li>
                        <a href="/" class="active">Home</a>
                    </li>
                    <li>
                        <a href="/blog">Journal</a>
                    </li>
                    <li>
                        <a href="/about">About</a>
                    </li>
                    <li>
                        <a href="/contact">Contact</a>
                    </li>
                </ul>
            </nav>

            <a href="#" onClick={this.expandMenu}>Menu</a>
        );
    }
}

export default Menu;
