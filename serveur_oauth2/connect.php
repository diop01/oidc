<?php
try{
	$bdd = new PDO('mysql:host=localhost;dbname=my_oauth2_db', 'root', 'diodoS86;', array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
	
}
catch(PDOException $e){
	echo 'La base de donnée n\'est pas disponible, merci de rééssayer plutard !';
}

/*
$reponse = $bdd->query('SELECT * FROM oauth_users');
while ($donnees = $reponse->fetch())
{
	echo '<p>' . $donnees['username'] . '</p>';
}
*/

?>