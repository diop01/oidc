

//var adresseServeur = "oidc.orange-labs.fr";

function accueil(){

					$("#connexion").hide();
					$("#accueil").show();
					$("#connexionWithCode").hide();
                  }
function connexion(){

					$("#connexion").show();
					$("#accueil").hide();
					$("#resources").hide();
                 }

function connexionWithCode(){
		
					$("#connexionWithCode").show();
					$("#accueil").hide();
					$("#authentification").hide();
			       }
function authentification(){

					$("#authentification").show();
					$("#connexionWithCode").hide();
					$("#resources1").hide();
				    }
		

		// Access token
		function connecterClient(){

					var username = $("#username").val();
					var password = $("#password").val();
					if(username=="" ||password=="")
					{
						alert("username or password empty");
		                return 0 ;
						$("#loader").hide();
					}
					window.localStorage.setItem("user_id", username);
                    window.localStorage.setItem("password", CryptoJS.SHA256(password));
                    //var hx = $.get("http://www.google.com");
                    //Log(hx);
                   //alert(hx.responseText);
                      //http://192.168.43.34/OAuth2/token.php
					//var xhr = $.post("http://192.168.43.34/OAuth2/serveur_oauth2/token.php", {scope : "ami",client_id: "testclient", client_secret: "testpass", grant_type: "password", username: username, password: window.localStorage.getItem("password")}, function(data, status){
					var xhr = $.post("http://oidc.orange-labs.fr/oauth2/oidc/token.php", {scope : "ami",client_id: "testclient", client_secret: "testpass", grant_type: "password", username: username, password: window.localStorage.getItem("password")}, function(data, status){
					//var xhr = $.post("http://oidc.orange-labs.fr/MyServerOAuth2/serveur_oauth2:9292/token.php", {username: username, password: window.localStorage.getItem("password")}, function(data, status){
						alert("acces_token retrieved");

						//console.log(JSON.parse(data).access_token);
						window.localStorage.setItem("access_token", data['access_token']);
						//window.localStorage.setItem("access_token", JSON.parse(data).access_token);
						//alert(window.localStorage.getItem("access_token"));
						$("#loader").hide();
						$("#resources").show();
						$("#connexion").hide();
						}).done(function () {
							})
						.error(function (resultat, status, error) {alert(error);
						})
							.always(function () {
						});
					
					return false;
				
				
			   }
		 //list ami
        function getResources() {

			//var jqxhr = $.post("http://192.168.43.34/OAuth2/serveur_oauth2/resource.php",{ access_token: window.localStorage.getItem("access_token"), login:  window.localStorage.getItem("user_id")}, function (data, status) {
			var jqxhr = $.post("http://oidc.orange-labs.fr/oauth2/oidc/resource.php",{ access_token: window.localStorage.getItem("access_token"), login:  window.localStorage.getItem("user_id")}, function (data, status) {
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

			//var jqxhr = $.post("http://192.168.43.34/OAuth2/serveur_oauth2/resource2.php",{ access_token: window.localStorage.getItem("access_token"), login:  window.localStorage.getItem("user_id")}, function (data, status) {
			var jqxhr = $.post("http://oidc.orange-labs.fr/oauth2/oidc/resource2.php",{ access_token: window.localStorage.getItem("access_token"), login:  window.localStorage.getItem("user_id")}, function (data, status) {
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
		
		var entier =     Math.floor((Math.random() * 100) + 1); 
		var monState = entier; 
		window.localStorage.setItem("monState",monState);
		//var jqxhr = $.get("http://192.168.43.34/OAuth2/serveur_oauth2/authorize.php",{redirect_uri:"http://localhost/",scope:"ami", client_id:"testclient1", response_type:"code", state:monState}, function (data, status) {
		var jqxhr = $.get("http://oidc.orange-labs.fr/oauth2/oidc/authorize.php",{redirect_uri:"http://localhost/",scope:"ami", client_id:"testclient1", response_type:"code", state:monState}, function (data, status) {
		if (data)
		{
			if(window.localStorage.getItem("monState")!=data)
			
		{
			
			
	    alert("Warning CSRF suspected ");
		return 0;
		
		}
			
		$("#authentification").show();
		$("#connexionWithCode").hide();
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
			
		var login = $("#username1").val();
		var mdp = $("#password1").val();
		if(login=="" ||mdp=="")
		{
			alert("mot de passe ou login vide");
			return 0 ;
		}
		window.localStorage.setItem("user_id", login);
		window.localStorage.setItem("password", CryptoJS.SHA256(mdp));
		//var xhr = $.post("http://192.168.43.34/OAuth2/serveur_oauth2/authentification.php",{ userId: login ,mdp :window.localStorage.getItem("password")}, function (data, status) {
		//var xhr = $.post("http://"+adresseServeur+"/serveur_oauth2/token.php", {scope : "ami",client_id: "testclient", client_secret: "testpass", grant_type: "password", username: username, password: window.localStorage.getItem("password")}, function(data, status){
		var xhr = $.post("http://oidc.orange-labs.fr/oauth2/oidc/authentification.php", { userId: login ,mdp :window.localStorage.getItem("password")}, function (data, status) {

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
       
		alert(window.localStorage.getItem("user_id"));
		var jqxhr = $.get("http://oidc.orange-labs.fr/oauth2/oidc/authorize2.php",{user_id:window.localStorage.getItem("user_id"),redirect_uri:"http://localhost/",scope:"ami", client_id: "testclient1", response_type:"code", state:"axyz"}, function (data, status) {
		alert(data);
		var res = data.split(" "); 
		window.localStorage.setItem("code", res[3]);

		var jqxhr = $.post("http://oidc.orange-labs.fr/oauth2/oidc/token.php",{user_id:window.localStorage.getItem("user_id"),redirect_uri:"http://localhost/", client_id: "testclient1", client_secret: "testpass", grant_type: "authorization_code",code:  window.localStorage.getItem("code")}, function (data, status) {
		alert("acces_token retrieved");
		window.localStorage.setItem("access_token", data['access_token']);
		$("#resources1").show();
		$("#authentification").hide();
        }).done(function () {
        })
		.error(function (resultat, status, error) {alert(error);
		})
		.always(function () {
		});
        }).done(function () {
        })
		.error(function (resultat, status, error) {alert(error);
		})
		.always(function () {
		});

		}
		
		function authentifierClientWithScopeInfo(){  
		var login = $("#username1").val();
        var mdp = $("#password1").val();
		
		if(login=="" ||mdp=="")
		{
		alert("mot de passe ou login vide");
		return 0 ;
		}
		window.localStorage.setItem("password", CryptoJS.SHA256(mdp));
		var jqxhr = $.post("http://oidc.orange-labs.fr/oauth2/oidc/authentification.php",{ userId:  login,mdp :window.localStorage.getItem("password")}, function (data, status) {
		if(data==true)
		{
		window.localStorage.setItem("user_id", login);
		connecterClientWithCodeInfo();
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
		
		//connecterClientWithCode scope info
		function connecterClientWithCodeInfo() {
		
		alert(window.localStorage.getItem("user_id"));
		var jqxhr = $.get("http://oidc.orange-labs.fr/oauth2/oidc/authorize2.php",{user_id:window.localStorage.getItem("user_id"),scope:"info", client_id: "testclient2", response_type:"code", state:"axyz"}, function (data, status) {
		alert(data);
		var res = data.split(" "); 
		window.localStorage.setItem("code", res[3]);
	    var jqxhr = $.post("http://oidc.orange-labs.fr/oauth2/oidc/token.php",{ client_id: "testclient2", client_secret: "testpass", grant_type: "authorization_code",code:  window.localStorage.getItem("code")}, function (data, status) {
		alert("acces_token retrieved");
		window.localStorage.setItem("access_token", data['access_token']);
		$("#resources1").show();
		$("#authentification").hide();

        }).done(function () {
        })
		.error(function (resultat, status, error) {alert(error); 
		})
		.always(function () {
		});
        }).done(function () {
        })
		.error(function (resultat, status, error) {alert(error);
		})
		.always(function () {
		});


		}
		
		
	

