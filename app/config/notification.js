let notification = {
    className: 'notification',
    container: '.notification-stack',
    expiry: 5, // in seconds
    template: require('../../assets/partial/notification.html'),
    title: 'Notification',

    failure: {
        className: 'failure',
        title: 'Error'
    },
    information: {
        className: 'information',
        title: 'Information'
    },
    success: {
        className: 'success',
        title: 'Success'
    },
    warning: {
        className: 'warning',
        title: 'Warning'
    }
};

export default notification;