import React from 'react';
import ReactDOM from 'react-dom';
import Header from './layout/Header.jsx';

require("!style!css!sass!../scss/app.scss");

ReactDOM.render(<Header />, document.querySelector('header[role="banner"]'));
