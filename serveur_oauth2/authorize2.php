<?php
// include our OAuth2 Server object
require_once __DIR__.'/server.php';

$request = OAuth2\Request::createFromGlobals();
$response = new OAuth2\Response();
$userId = $_GET['user_id'];

/*
// display an authorization form
if (empty($_POST)) {
  exit('
<form method="post">
  <label>Do You Authorize TestClient?</label><br />
  <input type="submit" name="authorized" value="yes">
  <input type="submit" name="authorized" value="no">
</form>');
}
*/
// print the authorization code if the user has authorized your client
$is_authorized = true;
$server->handleAuthorizeRequest($request, $response, $is_authorized,$userId);
if ($is_authorized) {
  // this is only here so that you get to see your code in the cURL request. Otherwise, we'd redirect back to the client
  $code = substr($response->getHttpHeader('Location'), strpos($response->getHttpHeader('Location'), 'code=')+5, 40);
  exit("SUCCCESS! Authorization Code: $code");
}
$response->send();
?>
