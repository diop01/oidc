

		function connexion(){
			
					$("#connexion").show();
					$("#accueil").hide();
			
		}
		function connexionWithCode(){
		
					$("#connexionWithCode").show();
					$("#accueil").hide();
			
		}
		function authentification(){
			
					$("#authentification").show();
					$("#connexionWithCode").hide();
				
			
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
					var xhr = $.post("http://localhost:9292/token", { username: username, password: window.localStorage.getItem("password")}, function(data, status){
					alert("acces_token retrieved");
					
					console.log(JSON.parse(data).access_token);
						window.localStorage.setItem("access_token",JSON.parse(data).access_token);
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

			var jqxhr = $.post("http://localhost/MyServerOAuth2/serveur_oauth2/resource.php",{ access_token: window.localStorage.getItem("access_token"), login:  window.localStorage.getItem("user_id")}, function (data, status) {
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

			var jqxhr = $.post("http://localhost/MyServerOAuth2/serveur_oauth2/resource2.php",{ access_token: window.localStorage.getItem("access_token"), login:  window.localStorage.getItem("user_id")}, function (data, status) {
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
		//var jqxhr = $.get("http://localhost:9292/authorize",{redirect_uri:"http://localhost/",scope:"ami", client_id:"testclient1", response_type:"code", state:monState}, function (data, status) {
		var jqxhr = $.post("http://localhost:9292/authorize", function (data, status) {
		// alert(data);
		/*if (data)
			
		{
			if(window.localStorage.getItem("monState")!=data)
			
		{
			
			
	    alert("Warning CSRF suspected ");
		return 0;
		
		}*/
			
		$("#authentification").show();
		$("#connexionWithCode").hide();
		//}
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
		var xhr = $.post("authentification.php",{ userId: login ,mdp :window.localStorage.getItem("password")}, function (data, status) {
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
		var jqxhr = $.get("authorize2.php",{user_id:window.localStorage.getItem("user_id"),redirect_uri:"http://localhost/",scope:"ami", client_id: "testclient1", response_type:"code", state:"axyz"}, function (data, status) {
		alert(data);
		var res = data.split(" "); 
		window.localStorage.setItem("code", res[3]);

		var jqxhr = $.post("token.php",{user_id:window.localStorage.getItem("user_id"),redirect_uri:"http://localhost/", client_id: "testclient1", client_secret: "testpass", grant_type: "authorization_code",code:  window.localStorage.getItem("code")}, function (data, status) {
		alert("acces_token retrieved");
		window.localStorage.setItem("access_token", data['access_token']);
		$("#resources").show();
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
		var jqxhr = $.post("authentification.php",{ userId:  login,mdp :window.localStorage.getItem("password")}, function (data, status) {
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
		var jqxhr = $.get("authorize2.php",{user_id:window.localStorage.getItem("user_id"),scope:"info", client_id: "testclient2", response_type:"code", state:"axyz"}, function (data, status) {
		alert(data);
		var res = data.split(" "); 
		window.localStorage.setItem("code", res[3]);
	    var jqxhr = $.post("token.php",{ client_id: "testclient2", client_secret: "testpass", grant_type: "authorization_code",code:  window.localStorage.getItem("code")}, function (data, status) {
		alert("acces_token retrieved");
		window.localStorage.setItem("access_token", data['access_token']);
		$("#resources").show();
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
		
		
	
		
		