<?php
	header("Access-Control-Allow-Origin: *");
?>

<html>
	<head>
		<title>Access with user credentials</title>
		<link rel="stylesheet" type="text/css" href="style.css">
		<meta charset=utf-8" />
	</head>
	<body>
		<div id="conteneur">
			
			
			<?php
				
			
				//include 'connect.php';
				include 'server.php';
			?>
			
		<!-- Page accueil -->
		<div id="accueil">
		<h1>Accueil</h1>
		<div onclick="connexion();"><h1>Resource Owner Password Credentials Grant</h1></div>
		<div onclick="connexionWithCode();"><h1>Resource Owner Grant Code</h1></div>
		</div>
		
		<!-- Page application connexion with credentials-->
		<div id="connexion" style="display:none">
		<h1>Access with user credentials</h1>
		<div>
		<form id="formcom" >
			<p>username<input type="text" name="username"  /> </p>
			<p>password<input type="password" name="password"  /></p>
			<input type="submit" value="send" />
			 <div id="loader" style="display:none"><img src="loader.gif"  alt="loader" /> </div>
			<!--<div id="resource"></div> -->
		</form>
		<!--<input type="submit" onclick="connecterClient();" value="send" />-->
		</div>
		</div>
		
		<!-- Page application connexion with code-->
		<div id="connexionWithCode" style="display:none" >
		<h1>Access with code</h1>
		<!--</div>
		<div data-role="content">
         <input type="submit" onclick="seConnecter()" value="Authorize to se connecter avec mon compte" />
		</div>-->
		<div onclick="authentification();" ><h1>Authorize to se connecter avec mon compte</h1></div>
		</div>
		<!--Page application authentification-->
		<div id="authentification" style="display:none">
		<h1>authentification</h1>
		<form >
         Login:
        <p>username<input type="text" name="username"/></p>
        <p>password<input type="password" name="password" /></p>
        </form>
        <input type="submit" onclick="authentifierClientWithScopeAmi()" value="Authorize to see list ami" />
        </div>
		
		<!-- Page ressources with token -->
        <div id="resources"  style="display:none">
        <h1>Access ressources with token</h1>
        <form id="form_connexion">
        <p>Login:</p>
        </form>
        <input type="submit" onclick="getResources()" value="get  List  ami" />
		<input type="submit" onclick="getResourcesInfo()" value="get info  contact" />
        </div>
		
		<!--     Traitement jquery    -->
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
		<script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha256.js"></script>
		
		<script  type="text/javascript">
		
		function connexion(){
			//alert("coucou");
					$("#connexion").show();
					$("#accueil").hide();
			
		}
		function connexionWithCode(){
			//alert("coucou");
					$("#connexionWithCode").show();
					$("#accueil").hide();
			
		}
		function authentification(){
			//alert("coucou");
					$("#authentification").show();
					$("#connexionWithCode").hide();
				
			
		}
		
		
		// Access token
			//function connecterClient(){
				$(formcom).submit(function()
				{
					$("#loader").show();
				    $("#resources").hide();
					$("#connexion").show();
					var username = $(this).find("input[name=username]").val();
					var password = $(this).find("input[name=password]").val();
					//alert("coucou");
					//var username = $("input[name=username]").attr("value");
					//var password = $("input[name=password]").attr("value");
					//alert(username+"-----"+password);
					if(username=="" ||password=="")
					{
						alert("username or password empty");
		               return 0 ;
					}
					window.localStorage.setItem("user_id", username);
                    window.localStorage.setItem("password", CryptoJS.SHA256(password));
					var xhr = $.post("token.php", {scope : "ami",client_id: "testclient1", client_secret: "testpass", grant_type: "password", username: username, password: window.localStorage.getItem("password")}, function(data, statusS){
						alert("acces_token retrieved");
						window.localStorage.setItem("access_token", data['access_token']);
						$("#loader").hide();
						//$(location).attr('href',"form_1.php");
						//if(data !="$username"){
							//alert(data);
							//$(".error").empty().append(data);
						//}
						$("#resources").show();
						$("#connexion").hide();
						}).done(function () {
							})
						.error(function (resultat, status, error) {alert(error);
						})
							.always(function () {
						});
					
					return false;
				
				
				});
		 //list ami
        function getResources() {

			var jqxhr = $.post("resource.php",{ access_token: window.localStorage.getItem("access_token"), login:  window.localStorage.getItem("user_id")}, function (data, status) {
			alert(data);
			}).done(function () {
			})
			.error(function (resultat, status, error) {alert(error);
			})
			.always(function () {
			});
		}
		
		//contact info
		function getResourcesInfo() {

			var jqxhr = $.post("resource2.php",{ access_token: window.localStorage.getItem("access_token"), login:  window.localStorage.getItem("user_id")}, function (data, status) {
			alert(data);
			}).done(function () {
			})
			.error(function (resultat, status, error) {alert(error);
			})
			.always(function () {
			});
		}
		
		
		//seConnecterAvecMonCompte
        function seConnecter() {
			//$("#authentification").show();
			//$("#connexionWithCode").hide();
		var entier =     Math.floor((Math.random() * 100) + 1); 
		var monState = entier; 
		window.localStorage.setItem("monState",monState);
		var jqxhr = $.get("authorize.php",{redirect_uri:"http://localhost/",scope:"ami", client_id: testclient2, response_type:"code", state:monState}, function (data, status) {
		if (data)
		{
			if(window.localStorage.getItem("monState")!=data)
		{
		alert("Warning CSRF suspected ");
		//$.mobile.changePage("#accueil", { transition: "fade", changeHash: true });
		//exit();
		//$("#accueil").show();
		}
		//$.mobile.changePage("#authentification", { transition: "fade", changeHash: false });
		//$("#authentification").show();
		}
		}).done(function () {
		})
		.error(function (resultat, status, error) {alert(error);
		})
		.always(function () {
		});


		}
		
		
		//AUTHENTIFICATION
		function authentifierClientWithScopeAmi() {
		var login = $("input[name=username]").attr("value");
		var mdp = $("input[name=password]").attr("value");
		//var login = $(this).find("input[name=username]").val();
		//var mdp = $(this).find("input[name=password]").val();
		if(login=="" ||mdp=="")
		{
		alert("mot de passe ou login vide");
		return 0 ;
		}
		window.localStorage.setItem("user_id", login);
		window.localStorage.setItem("password", CryptoJS.SHA256(mdp));

		var xhr = $.post("authentification.php",{ userId:  login,mdp :window.localStorage.getItem("password")}, function (data, status) {
		if(data==true)
		{
		window.localStorage.setItem("user_id", login);
		connecterClientWithCode();

		}
		else 
		{
		window.localStorage.setItem("auth","false");
		alert("authentification failed");
		}
       }).done(function () {
       })
		.error(function (resultat, status, error) {alert(error);
		})
		.always(function () {
		});

		}
		
		//connecterClientWithCode scope ami
        function connecterClientWithCode() {
       //
       /*
        window.location ="http://localhost/www/my-oauth2-walkthrough/oauth2-server-php/authorize.php?response_type=code&client_id=testclient&state=xyz";*/
		alert(window.localStorage.getItem("user_id"));
		var jqxhr = $.get("authorize2.php",{user_id:window.localStorage.getItem("user_id"),redirect_uri:"http://localhost/",scope:"ami", client_id: testclient1, response_type:"code", state:"axyz"}, function (data, status) {
		alert(data);
		var res = data.split(" "); 
		window.localStorage.setItem("code", res[3]);

		var jqxhr = $.post("token.php",{user_id:window.localStorage.getItem("user_id"),redirect_uri:"http://localhost/", client_id: testclient1, client_secret:  testpass, grant_type: "authorization_code",code:  window.localStorage.getItem("code")}, function (data, status) {
		alert("acces_token retrieved");
		window.localStorage.setItem("access_token", data['access_token']);
		//$.mobile.changePage("#resources", { transition: "fade", changeHash: true });
		$("#resources").show();
        }).done(function () {
        })
		.error(function (resultat, status, error) {alert(error);
		})
		.always(function () {
		});

		/*
		alert("acces_token retrieved");
		window.localStorage.setItem("access_token", data['access_token']);
		$.mobile.changePage("#resources", { transition: "fade", changeHash: true });
		*/
       }).done(function () {
       })
		.error(function (resultat, status, error) {alert(error);
		})
		.always(function () {
		});

		}
		
		
		</script>
		
		
	</body>
</html>