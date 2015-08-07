/****** START CODE  *********/

var express = require('express'); 
var bodyParser = require('body-parser');
var httpUtils = require('http');
var app = express();
var client_id = "testclient";
var client_id1 = "testclient1";
var client_secret = "testpass";
var grant_type = ["password","authorization_code"];
var scope = ["ami", "info"];
redirect_uri = "http://localhost/";
response_type = "code";
var URLProvider ="127.0.0.1";
const PORT=9292; 
var queryString = require("queryString");
var json = require("JSON");
var fs = require('fs');

 
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended: true
	
})); 


var server = app.listen(PORT, function () { 
  	console.log('listening... ');
});

// Access token
app.post('/token',  function(req, response){
	var user = req.body.username,
		pass = req.body.password;
	var newData =queryString.stringify({
		scope : scope[0],
		client_id: client_id, 
		client_secret: client_secret, 
		grant_type: grant_type[0],
		'username':user,
		'password':pass
		}); 
	//httpUtils.get(URLProvider+"/?"+newData, function(res) {
	var post_options = {
    host: URLProvider,
    port: '80',
    path: '/serveur_oauth2/token.php/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': newData.length
       }
	};
	var post_req = httpUtils.request(post_options, function(res) {
		var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() { 
        	//var responseProvider = JSON.parse(body); 
		response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
		console.log(body.access_token);
    	response.send(body);
        }); 
    }).on('error', function(e) { 
        console.log("Got error: " + e.message);
    });
    console.log(req.body);
	post_req.write(newData); 
	post_req.end();
	

});
  app.get('/', function (req, res) {
  res.send('Service relais !');
});

//Authorize
app.post('/authorize',  function(req, response){
	var entier =     Math.floor((Math.random() * 100) + 1); 
	var state = entier;
	//var monstate = req.body.state;
		//token = req.body.access_token;
	console.log(req.body);
	var newData1 =queryString.stringify({
		redirect_uri: redirect_uri,
		scope: scope[0],
		client_id1: client_id1,
		response_type:response_type,
		state : state
		});
	
	var post_options1 = {
    host: URLProvider,
    port: '80',
    path: '/serveur_oauth2/authorize.php/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': newData1.length
       }
	};
	console.log(newData1);
	//var URLProvider1 = "127.0.0.1/serveur_oauth2/authorize.php/";
	var post_req1 = httpUtils.request(post_options1, function(res) {
		var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() { 
        	//var responseProvider = JSON.parse(body); 
		response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    	response.send(body);
		//console.log(response);
        }); 
    }).on('error', function(e) { 
        console.log("Got error: " + e.message);
    });
    console.log(req.body);
	post_req1.write(newData1); 
	post_req1.end();

   }); 
   
   app.get('/', function (req, res) {
   res.send('Service relais !');
});


/*
app.get('/authorize',  function(req, response){
	var entier =     Math.floor((Math.random() * 100) + 1); 
	var state = entier;
	//var monstate = req.body.state;
		//token = req.body.access_token;
	console.log(req.body);
	var newData1 =queryString.String.stringify({
		redirect_uri: redirect_uri,
		scope: scope[0],
		client_id: client_id[1],
		response_type:response_type,
		state : state
	/*var newData1 =JSON.stringify({
		'user':user,
		'pass':pass,
		'secret':SECRET
		}); */
/*	});
	console.log(newData1);
	var URLProvider1 = "127.0.0.1/serveur_oauth2/authorize.php/";
	httpUtils.get(URLProvider1+"/?"+newData1, function(res) {
		var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() { 
        	//var responseProvider = JSON.parse(body); 
    		response.send(body);
        }); 
    }).on('error', function(e) { 
        console.log("Got error: " + e.message);
    });
    console.log(req.body);

}); 
  app.get('/', function (req, res) {
   res.send('Service relais !');
});

 */ 

/******* END CODE *******/