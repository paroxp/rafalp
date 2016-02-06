import React from 'react';
import {Link} from 'react-router';

class About extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <main role="main" className="about">
                <aside>
                    <figure>
                        <img src="//www.gravatar.com/avatar/8f45b22841bba3868c141f3ca3470139.png?s=150" alt="Rafal Proszowski" />
                            <figcaption>
                                <h3>Rafal Proszowski</h3>
                                Twitter: <a href="//twitter.com/paroxp" target="_blank" rel="external nofollow" title="Twitter">@paroxp</a><br />
                                <Link to="/contact" title="Contact">Contact</Link>
                            </figcaption>
                    </figure>

                    <element name="php">
                        <label>PHP</label>
                        <progress value="75" max="100"></progress>
                        <details open>
                            <summary>PHP</summary>
                            Over 5 years of experience with PHP, helped me to develop this skill almost to mastery.
                            By playing around with many frameworks, such as <a href="https://laravel.com/" target="_blank" rel="external nofollow">Laravel</a> &amp; <a href="https://lumen.laravel.com/" target="_blank" rel="external nofollow">Lumen</a>, <a href="http://cakephp.org/" target="_blank" rel="external nofollow">CakePHP</a>, <a href="https://www.codeigniter.com/" target="_blank" rel="external nofollow">CodeIgniter</a>, <a href="http://silex.sensiolabs.org/" target="_blank" rel="external nofollow">Silex</a> &amp; <a href="http://cilex.github.io/" target="_blank" rel="external nofollow">Cilex</a>,
                            and little bits of others, I am able to put together some amazing applications.
                            I go around with Composer and PSRs, however I may be a little bit behind, due to my new role,
                            especially with the new PHP 7 stuff.
                        </details>
                    </element>

                    <element name="js">
                        <label>JavaScript</label>
                        <progress value="60" max="100"></progress>
                        <details open>
                            <summary>JavaScript</summary>
                            JavaScript, has became my daily bread lately. I've got a lot of experience with <a href="https://jquery.com/" target="_blank" rel="external nofollow">jQuery</a> and plugins written for it. About a year ago, I decided, I didn't like it that much, and more often
                            find myself trying to avoid using it. Lately, I'm dipping myself with some <a href="https://angular.io/" target="_blank" rel="external nofollow">Angular</a> &amp; <a href="http://www.typescriptlang.org/" target="_blank" rel="external nofollow">TypeScript</a>, and hoping to do the same thing with <a href="https://facebook.github.io/react/" target="_blank" rel="external nofollow">React</a>.
                            I am doing some WebGL stuff, therefore, I've also looked into: <a href="http://www.pixijs.com/" target="_blank" rel="external nofollow">Pixi.js</a>.
                        </details>
                    </element>

                    <element name="html">
                        <label>HTML</label>
                        <progress value="90" max="100"></progress>
                        <details open>
                            <summary>HTML</summary>
                            Not much I could really say here... I try to keep my syntax neat and clean, use roles and appropriate
                            tag elements where possible... I believe in the potential of HTML5!
                        </details>
                    </element>

                    <element name="css">
                        <label>CSS</label>
                        <progress value="90" max="100"></progress>
                        <details open>
                            <summary>CSS</summary>
                            I try to be up to date with css trends and functionality. I love SASS and prefer it over Less.
                            I use <a href="http://susy.oddbird.net/">Susy</a> very often and lately I've started using <a href="http://bourbon.io/" target="_blank" rel="external nofollow">Bourbon</a>,
                            in order to increase productivity. Also, mobile-first!
                        </details>
                    </element>

                    <p>
                        I do hate these scales. Everyone has a different understanding of them. Don't take them seriously...
                        In fact, if you'd like to know more, ask! I'll be more than happy to explore the topic with you :D
                    </p>
                </aside>

                <section>
                    <h3>Education, Experience and Training</h3>

                    <ol>
                        <li>2010 - 2012: Newcastle College, Extended Diploma in IT</li>
                        <li>
                            2012 - 2013: Junior Web Developer at <a href="http://whysurreal.com/" target="_blank" rel="external nofollow">Surreal Creative</a>
                        </li>
                        <li>
                            2013 - 2015: Developer at <a href="http://hurstdev.co.uk/" target="_blank" rel="external nofollow">HurstDEV</a>
                        </li>
                        <li>
                            2015 - *: Front End Developer at <a href="http://flipsports.com/" target="_blank" rel="external nofollow">FLIP Sports</a>
                        </li>
                    </ol>

                    <h3>References</h3>

                    <ol>
                        <li>
                            Mr. <a href="http://jonpark.co.uk/" target="_blank" rel="external nofollow">Jon Park</a> - Senior Full Stack Developer at Bytemark
                        </li>
                        <li>
                            Mr. <a href="http://hurstdev.co.uk/" target="_blank" rel="external nofollow">Jamie Hurst</a> - Director and Developer at HurstDEV
                        </li>
                    </ol>

                    <h3>Other amazing things previously encountered</h3>

                    <p>
                        Git, Foundation, Bootstrap, Golang, Revel, Node.js, npm, Sails.js, Express.js, Grunt, Gulp, Bower, NGINX, Apache2,
                        Ubuntu Server, Memcached, Redis, Mailgun, JWT, Ruby on Rails, Java.
                    </p>

                    <h3>Hobbies &amp; Interests</h3>

                    <p>ICT, Computing, Programming, Developing, Gaming, Beta testing, Open Source etc.</p>
                    <p>Sports like Swimming, Surfing, Basketball, Paint-ball, Free-run, Le Parkour and any other extreme sports.</p>
                    <p>PHP NE, Golang, Frontend NE conferences and monthly based meetings.</p>

                </section>
            </main>
        );
    }
}

export default About;
