import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './layout/Menu.jsx';

require("!style!css!sass!../scss/app.scss");

ReactDOM.render(<Menu />, document.getElementById('navigation'));
