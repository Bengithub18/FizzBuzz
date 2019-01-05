var express = require('express');
var app = express();

var server = app.listen(8080, function () {

	var host = server.address().address;
	var port = server.address().port;

	app.get('/', function (req, res) {
		res.sendFile( __dirname + "/" + "Login_Page.html" );
	})

	app.get('/Login', function (req, res) {

		var Link = req.originalUrl;
		var Data = Link.split("=");

		var Login_Name_Full = ((Data[1]).split("&"));
		var Login_Name = Login_Name_Full[0]
		var Pass_Name = Data[2];

		Correct_name = "ben";
		Correct_pass = "fizzbuzz"
        if ((Login_Name==Correct_name) && (Pass_Name==Correct_pass)) {
			res.sendFile( __dirname + "/" + "Main_Page.html" );
		}
		else {
			res.sendFile( __dirname + "/" + "Login_Page.html" );
		}
		

	})

	app.post('/Guest', function (req, res) {
		res.sendFile( __dirname + "/" + "Main_Page.html" );

	})

	console.log("Testing at http://%s:%s", host, port);
   	
})