<?php
require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/middleware.php';

use Slim\Factory\AppFactory;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Firebase\JWT\JWT;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/');
$dotenv->load();

$app = AppFactory::create();

// Middleware global
$app->addRoutingMiddleware();
$app->addBodyParsingMiddleware();
$app->addErrorMiddleware(true, true, true);

// Route de connexion (Génère un JWT)
$app->post('/login', function (Request $request, Response $response) {
    $data = json_decode($request->getBody()->getContents(), true);

    // Simuler un utilisateur
    if ($data['username'] !== 'admin' || $data['password'] !== '1234') {
        return $response->withStatus(401)->write('Unauthorized');
    }

    $payload = [
        'user' => $data['username'],
        'exp' => time() + 3600  // Expire dans 1 heure
    ];

    $jwt = JWT::encode($payload, $_ENV['JWT_SECRET'], 'HS256');

    $response->getBody()->write(json_encode(['token' => $jwt]));
    return $response->withHeader('Content-Type', 'application/json');
});

// Route protégée
$app->get('/users', function (Request $request, Response $response) {
    $users = [
        ['id' => 1, 'name' => 'Alice'],
        ['id' => 2, 'name' => 'Bob']
    ];

    $response->getBody()->write(json_encode($users));
    return $response->withHeader('Content-Type', 'application/json');
})->add('jwtMiddleware');

$app->run();
