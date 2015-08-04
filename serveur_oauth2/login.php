<?php
	//print_r($_POST);
	
	
	extract($_POST);
	
	If( isset($_POST) && !empty ($_POST['username']) && !empty ($_POST['password'])) {
		//include "connect.php";
		include "server.php";
		//echo "$username,$password";
		$pass = sha1($_POST['password']);
		$req = $storage->prepare('SELECT username, password FROM oauth_users WHERE username = :username AND password = :password');
		$req->execute(array(
			'username' => $username,
			'password' => $pass
		));
		$resultat = $req->fetch();
		if (!$resultat){

			echo 'Mauvais identifiant ou mot de passe !';
        }
		else{
			echo "connexion réussie";
		}
		
	}
	else{
		echo"username or password vide !";
	}
		
		
?>

