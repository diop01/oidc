<?php
header("Access-Control-Allow-Origin: *");

/*$dsn      = 'mysql:dbname=u456009263_oauth;host=mysql.hostinger.co.uk';*/
$dsn      = 'mysql:dbname=my_oauth2_db;host=127.0.0.1';
$username = 'root';
$password = 'diodoS86;';

// error reporting (this is a demo, after all!)
ini_set('display_errors',1);error_reporting(E_ALL);

// Autoloading (composer is preferred, but for this example let's just do this)
require_once('src/OAuth2/Autoloader.php');
OAuth2\Autoloader::register();
//echo "teste";
// $dsn is the Data Source Name for your database, for exmaple "mysql:dbname=my_oauth2_db;host=localhost"
$storage = new OAuth2\Storage\Pdo(array('dsn' => $dsn, 'username' => $username, 'password' => $password));
/*
$reponse = $storage->query('SELECT * FROM oauth_users');
while ($donnees = $reponse->fetch())
{
	echo '<p>' . $donnees['username'] . '</p>';
}
*/

// Pass a storage object or array of storage objects to the OAuth2 server class
$server = new OAuth2\Server($storage);

// Add the "Client Credentials" grant type (it is the simplest of the grant types)
$server->addGrantType(new OAuth2\GrantType\ClientCredentials($storage));

// Add the "Authorization Code" grant type (this is where the oauth magic happens)
$server->addGrantType(new OAuth2\GrantType\AuthorizationCode($storage));
?>
