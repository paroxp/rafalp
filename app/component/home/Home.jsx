import React from 'react';

class Home extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <main role="main">
                <img src="img/beard.svg" alt="Beard!"/>

                <p>
                    Howdy! My name is Rafal, and I am friendly and hairy web developer, based in
                    Newcastle upon Tyne, UK. Currently I'm serving my ninja duty at <a href="http://flipsports.com/" target="_blank" rel="external nofollow">FLIP Sports</a>.
                    I am also, trying to keep up with the cool stuff, by attending the amazing <a href="http://frontendne.co.uk/" target="_blank" rel="external nofollow">Frontend NE</a> meet ups!
                </p>
            </main>
        );
    }
}

export default Home;
