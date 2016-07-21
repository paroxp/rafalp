import PageTransition from '../event/transition';

let view = {
    action: 'replace',
    activeClass: 'active',
    container: 'body > main',
    event: PageTransition.run,
    enterClass: 'entering',
    leaveClass: 'leaving',
    timeout: 500
};

export default view;