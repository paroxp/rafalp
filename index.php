<?php

require 'vendor/autoload.php';

use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;

/**
 * Define the view component.
 *
 * @param \Slim\Container $container
 * @return \Slim\Views\Twig
 */
function buildView(Slim\Container $container)
{
    $view = new \Slim\Views\Twig('assets', [
        'cache' => 'cache'
    ]);

    $view->addExtension(new \Slim\Views\TwigExtension(
        $container['router'],
        $container['request']->getUri()
    ));

    return $view;
}

/**
 * Define the container.
 */
$container = new \Slim\Container();

/**
 * Enable container to use Twig templating system.
 *
 * @param $container
 * @return \Slim\Views\Twig
 */
$container['view'] = function ($container) {
    return buildView($container);
};

/**
 * Overwrite the 404 page, inside the container.
 *
 * @param $container
 * @return Closure
 */
$container['notFoundHandler'] = function ($container) {
    return function (ServerRequestInterface $request, ResponseInterface $response) use ($container) {
        return buildView($container)->render($response->withStatus(404), '/page/404.html');
    };
};

/**
 * Define the main application.
 */
$app = new Slim\App($container);

/**
 * Define route, for the homepage.
 */
$app->get('/', function (ServerRequestInterface $request, ResponseInterface $response, $arguments) {
    return $this->view->render($response, '/page/home.html');
});

/**
 * Define the route for the about page.
 */
$app->get('/about', function (ServerRequestInterface $request, ResponseInterface $response, $arguments) {
    return $this->view->render($response, '/page/about.html');
});

/**
 * Define the route for the contact page.
 */
$app->get('/contact', function (ServerRequestInterface $request, ResponseInterface $response, $arguments) {
    return $this->view->render($response, '/page/contact.html');
});

/**
 * Run the application.
 */
$app->run();