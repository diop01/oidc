<html>
	<head>
		<title>Test Oauth2</title>
		<meta charset=utf-8" />
	</head>
	<body>
		<div id="conteneur">
			
			
			<?php
			
				//include 'connect.php';
				include 'server.php';
			?>
			
		<div id="resultatAjax"></div> 
		<h1>Access use credentials</h1>
		<!-- <div class="error" style="color: #FF0000;"></div> -->
		<form method="POST" action="#" id="formcom"  />
		
		
			<p><input type="text" name="username" > </p>
			<p><input type="password" name="password" ></p>
			<input type="submit" value="envoyer" />
			<div id="loader" style="display:none"><img src="loader.gif"  alt="loader" /> </div>
			
		
		</form>
		
		</div>
		
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
		<script  type="text/javascript">
			$(function(){
				$(forcom).submit(function(){
					var username = $("input[name=username]").val();
				    var password = $("input[name=password]").val();
					if(username=="" ||password=="")
		            {
		              alert("mot de passe ou login vide");
		              return 0 ;
		            }
				})
			})
		</script>
	</body>
</html>