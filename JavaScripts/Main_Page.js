// import Global_Scripts as Funcs
var Ask_Score = new XMLHttpRequest();
var Update_Score = new XMLHttpRequest();

var Current_Score = 0;


Ask_Score.open('GET', '/Ask_Score', false)
Ask_Score.onload = function() {
	Current_Score = JSON.parse(Ask_Score.response).score;	
}
Ask_Score.send();

function Increment_Score() {

	var Output = ToFizzBuzz(Current_Score);
	document.getElementById('Score_Display').innerHTML = Output;

	Update_Score.open('GET', '/Update_Score')
	Update_Score.responseType = 'json';
	Update_Score.onload = function() {
		Current_Score = Update_Score.response.score;
	}
	Update_Score.send();
	
}