<html>
	<head>
		<title>Access resources with token</title>
		<link rel="stylesheet" type="text/css" href="style.css">
		<meta charset=utf-8" />
	</head>
	<body>
		<h1>Access resources with token</h1>
		
		<form method="POST" action="#" id="formcom1"  />
		
			<p><label>Login:</label></p>
			<p><input type="submit" value="get List ami" /></p>
			<!-- <p><input type="submit" value="get List contact" /></p> -->
		</form>
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
		<script  type="text/javascript">
		alert(coucou);
			//$(function(){
				$(formcom1).submit(function(){
					var hxr = $.post("resource.php", { access_token: window.localStorage.getItem("access_token"), login: window.localStorage.getItem("user_id")}, function (data) {
					alert(data);
					});
				});
			//});
		</script>
	</body>
</html>