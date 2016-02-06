import React from 'react';

class Footer extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <footer role="contentinfo">
                <ul className="social">
                    <li>
                        <a href="//github.com/paroxp" target="_blank" rel="external nofollow" title="GitHub">
                            <i className="fa fa-github"></i>
                        </a>
                    </li>
                    <li>
                        <a href="//twitter.com/paroxp" target="_blank" rel="external nofollow" title="Twitter">
                            <i className="fa fa-twitter"></i>
                        </a>
                    </li>
                    <li>
                        <a href="//linkedin.com/in/rafał-proszowski-78816744" target="_blank" rel="external nofollow"
                           title="LinkedIn">
                            <i className="fa fa-linkedin"></i>
                        </a>
                    </li>
                    <li>
                        <a href="//play.spotify.com/user/1151201520" target="_blank" rel="external nofollow"
                           title="Spotify">
                            <i className="fa fa-spotify"></i>
                        </a>
                    </li>
                    <li>
                        <a href="/contact" title="Contact">
                            <i className="fa fa-envelope"></i>
                        </a>
                    </li>
                </ul>

                <div className="copyright">
                    <small>Copyright 2014 - 2016</small>
                </div>
            </footer>
        );
    }
}

export default Footer;