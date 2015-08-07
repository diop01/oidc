<?php
	//print_r($_POST);
	
	
	extract($_POST);
	If( isset($_POST) && !empty ($_POST['username']) && !empty ($_POST['password'])) {
		include "connect.php";
		//echo "$username,$password";
		$pass = sha2($_POST['password']);
		$sql = "INSERT INTO oauth_users(username,password) VALUES ('$username','$pass')";
		$bdd->exec($sql);
		echo "$username";
	 }
	else{
		echo"username or password  vide !";
	}
	
	
?>

