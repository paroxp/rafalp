<?php

require 'vendor/autoload.php';

use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;

$container = new \Slim\Container();

$container['notFoundHandler'] = function ($container) {
    $container['response']
        ->withStatus(404);

    return $this->view->render($container['response'], '/page/404.html');
};

$container['view'] = function ($container) {
    $view = new \Slim\Views\Twig('assets', [
        'cache' => 'cache'
    ]);

    $view->addExtension(new \Slim\Views\TwigExtension(
        $container['router'],
        $container['request']->getUri()
    ));

    return $view;
};

$app = new Slim\App($container);

$app->get('/', function (ServerRequestInterface $request, ResponseInterface $response, $arguments) {
    return $this->view->render($response, '/page/home.html');
});

$app->get('/about', function (ServerRequestInterface $request, ResponseInterface $response, $arguments) {
    return $this->view->render($response, '/page/about.html');
});

$app->get('/contact', function (ServerRequestInterface $request, ResponseInterface $response, $arguments) {
    return $this->view->render($response, '/page/contact.html');
});

$app->run();