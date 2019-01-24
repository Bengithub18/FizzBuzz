
const ExpCall 	= require('express');
const fs		= require('fs');
const app 		= ExpCall();


var server = app.listen(8080, function() {

	var Score = 0;

	var U_Name = "";
	var User_Key  = 0;


	app.get('/', function (req, res) {
	  res.sendFile(__dirname + '/HTML/Login_Page.html')
	})

	app.get('/JavaScripts/Login_Page.js', function (req, res) {
		res.sendFile(__dirname + req.url)
	})

	app.get('/JavaScripts/Main_Page.js', function (req, res) {
		res.sendFile(__dirname + req.url)
	})

	app.get('/JavaScripts/Global_Scripts.js', function (req, res) {
		res.sendFile(__dirname + req.url)
	})

	app.get('/CSS/Main_Page.css', function (req, res) {
		res.sendFile(__dirname + req.url)
	})

	app.get('/CSS/Login_Page.css', function (req, res) {
		res.sendFile(__dirname + req.url)
	})

	app.get('/CSS/Global_CSS.css', function (req, res) {
		res.sendFile(__dirname + req.url)
	})

	app.get('/HTML/Main_Page.html', function (req, res) {
		var Full_URL = req.url.split('?');
		var U_Name = Full_URL[1].split('=')[1];
		var All_Users = JSON.parse(fs.readFileSync('./DataBase/Database.json'))
		

		if (U_Name == '') {
			res.sendFile(__dirname + '/HTML/Login_Page.html' )
		}
		else { 
			
			Flag = 0;
			for ( Curr_User in All_Users.Users) {
				if (All_Users.Users[Curr_User].name == U_Name) {
					Flag = 1;
					User_Key = Curr_User;
					Score = All_Users.Users[Curr_User].score;
					break;
				}
			}
			if ( Flag == 0 ) {

				All_Users.Users.push( { name : U_Name, score : 0 } );
				User_Key = Curr_User + 1;
				var WriteObj = JSON.stringify(All_Users);

				fs.writeFile('./DataBase/Database.json', WriteObj, 'utf8', function(err) {
						if (err) throw err;
						console.log('New User Added')
					})
			}

			res.sendFile(__dirname + Full_URL[0] )
		}
	})

	app.get('/Ask_Score', function (req, res) {
		var All_Users = JSON.parse(fs.readFileSync('./DataBase/Database.json'));
		res.send( { score : All_Users.Users[User_Key].score } );
	})

	app.get('/Update_Score', function (req, res) {

		var All_Users = JSON.parse(fs.readFileSync('./DataBase/Database.json'));
		All_Users.Users[User_Key].score = All_Users.Users[User_Key].score + 1;
		res.send( { score : All_Users.Users[User_Key].score } );

		var WriteObj = JSON.stringify(All_Users);

		fs.writeFile('./DataBase/Database.json', WriteObj, 'utf8', function(err) {
				if (err) throw err;
			})

	})

})

