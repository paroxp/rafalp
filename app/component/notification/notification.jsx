import React from 'react';
import {render} from 'react-dom';

import moment from 'moment';

import Security from '../../system/security.jsx';

class Notification {
    constructor(type = 'info', title = 'Notification', message = '') {
        this.id = Security.guid();
        this.type = type;
        this.title = title;
        this.message = message;
        this.created_at = new Date();
    }
}

export default Notification;
