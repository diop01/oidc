<?php
	//print_r($_POST);
	
	
	extract($_POST);
	
	If( isset($_POST) && !empty ($_POST['username']) && !empty ($_POST['password'])) {
		include "connect.php";
		//echo "$username,$password";
		$pass = sha1($_POST['password']);
		$rslt = $bdd->query("SELECT username, password FROM oauth_users");
		print_r(username,password);
		if(username===$_POST['username'] && password===$_POST['password']){
				echo "connexion réussie";
		}
		else{
		echo"Echec de connexion !";
	   }
	}
	else{
		echo"username or password vide !";
	}
?>

