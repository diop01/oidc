<?php
// include our OAuth2 Server object
require_once __DIR__.'/server.php';
$m1 =$_POST['login'];
$access_token= ($_POST['access_token']);
// Handle a request for an OAuth2.0 Access Token and send the response to the client
if (!$server->verifyResourceRequest(OAuth2\Request::createFromGlobals(),null,"info")) {
    $server->getResponse()->send();
    die;
}

include 'config.php';



//echo 'data';





$sql1 = "select info 
		from ressources
		where login='$m1'";
		



		//echo $md5test;

try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->prepare($sql1);  
	$stmt->execute();
	
	$motdepasse = $stmt->fetch(PDO::FETCH_ASSOC);

echo $motdepasse['info'];

} catch(PDOException $e) {
	//echo "exception";
	//echo "true";
	echo '{"error":{"text":'. $e->getMessage() .'}}'; //erreurs
}


//echo json_encode(array('success' => true, 'message' => 'You accessed my APIs!'));
?>
