import React from 'react';
import {render} from 'react-dom';

import routes from './config/routes.jsx';

require("!style!css!sass!../scss/app.scss");

render(routes, document.getElementById('Application'));