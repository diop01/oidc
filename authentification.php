<?php
// include our OAuth2 Server object
require_once __DIR__.'/server.php';
include 'config.php';
echo "test";
$m1 =$_POST['userId'];
$mdp= ($_POST['mdp']);





//echo 'data';





$sql1 = "select username , password
		from oauth_users
		where username='$m1'";
		



		//echo $md5test;

try {
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbh->prepare($sql1);  
	$stmt->execute();
	
	$motdepasse = $stmt->fetch(PDO::FETCH_ASSOC);
if($motdepasse['password']==$mdp)
{echo true;}else echo false;


} catch(PDOException $e) {
	//echo "exception";
	//echo "true";
	echo '{"error":{"text":'. $e->getMessage() .'}}'; //erreurs
}


//echo json_encode(array('success' => true, 'message' => 'You accessed my APIs!'));
?>
