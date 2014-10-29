$(document).ready(function () {

//FastClick.attach(document.body);
/*var name = prompt("Name?","");*/
/*document.getElementById("name").innerHTML=name;*/
var ctx = $('#canvas')[0].getContext('2d');
var w = $('#canvas').width();
var h = $('#canvas').height();
var newScore = false;

/*var idTable = {};
idTable['num']        = $("#num :selected").text();
idTable['NorS']       = $("#NorS :selected").text();
idTable['scoreSort1'] = $("#scoreSort1 :selected").text();
idTable['scoreSort2'] = $("#scoreSort2 :selected").text();
idTable['input']      = $("#input :selected").text();*/


var doge = new doge(50, 125, h/2-25, h/2+25, 0, 15);

var score = 0;

var pipes = [];

function init () {
	if(typeof game_loop != "undefined") clearInterval(game_loop);
							 game_loop = setInterval(Paint, 25);
}

init();

function pause () {
	clearInterval(game_loop);
}

function unpause () {
	game_loop = setInterval(Paint, 25);
}

/*function submitScore (score) {
	if (score > 0) {
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange=function() {
	      	document.getElementById("database1").innerHTML = xmlhttp.responseText;
	  	}

		xmlhttp.open("SET","setscore.php?q="+score+"&n="+name,true);
	  	xmlhttp.send();
	  	newScore = true;
	  	return true;
	}
		newScore = false;
		return false;
	
}

function showScores () {
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function() {
	    	document.getElementById("database1").innerHTML = xmlhttp.responseText;
	  	}
	
	xmlhttp.open("GET","showscores.php?n="+name+"&l="+idTable[0]+"&o="+"false",true);
	xmlhttp.send();

	xmlhttp2 = new XMLHttpRequest();
	xmlhttp2.onreadystatechange=function() {
	    	document.getElementById("database2").innerHTML = xmlhttp2.responseText;
	  	}
	
	xmlhttp2.open("GET","showscores.php?n="+name+"&l="+idTable[0]+"&o="+"true",true);
	xmlhttp2.send();
}*/

/*function filterScores () {
	xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function() {
	    	document.getElementById("database").innerHTML = xmlhttp.responseText;
	  	}
	
	xmlhttp.open("GET","filterscores.php?a="+idTable[0]+"&b="+idTable[1]+"&c="+idTable[2]+"&d="+idTable[3]+"&e="+idTable[4],true);
	xmlhttp.send();
}*/

/*
showScores();*/

function reset () {
	//submitScore(score);
	doge.y1 = h/2-25;
	doge.y2 = h/2+25;
	doge.a = 15;
	doge.direction = 0;
	pipes = [];
	pipesCounter = 0;
	score = 0;
}

function Paint() {
	//control pipes
	//if (pipes.length === 1 && pipesCounter == 2 && newScore) showScores();
	if (pipesCounter >= 110 || pipes.length === 0) {
		pipesCounter = 0;
		var gap = Math.random()*(h-340)+75;
		pipes.push(new Pipe(w, 150, gap, gap+190));
		
	}
	else {
		pipesCounter++;
	}
	for (var i in pipes) {
		pipes[i].x1 -= 5;
		pipes[i].x2 -= 5;
		
		if (pipes[i].checkCollision(doge)) {
			reset();
		}
		
	}
	if ((pipes[0].x1 < 30) && (pipesCounter == 100)){ incScore(); }
		
	//control doge
	doge.y1 -= doge.a;
	doge.y2 -= doge.a;


	if (doge.y1 <= 0 || doge.y2 >= h) {
		reset();
	}

	if (doge.a > -16) {
		doge.a -= 1
	}
	
	//checking inputs for sorting scores
	var num        = $("#num :selected").text();
	var NorS       = $("#NorS :selected").text();

	/*if (NorS != idTable['NorS']) {
		switch (NorS) {
			case "Score":
			//if ($("#scoreSort1")[0].innerHTML==""||$("#scoreSort1")[0].innerHTML==undefined) {
				$("#scoreSort2")[0].innerHTML="<select id='aeb'><option value='below'>Below</option><option value='above'>Above</option><option value='equal'>Equal To</option></select> the score of: ";
				$("#scoreSort1")[0].innerHTML="Sort scores in <select id='ad'><option value='desc'>Descending</option><option value='asc'>Ascending</option></select> order";
				$("#input")[0].placeholder="Score";
				break;
			//}
			case "Name":
				$("#scoreSort2")[0].innerHTML="";
				$("#scoreSort1")[0].innerHTML="";
				$("#input")[0].placeholder="Name";
				break;

			default:
				break;

		}

		idTable['NorS'] = NorS;
		idTable['scoreSort1'] = $("#scoreSort1")[0].innerHTML;
		idTable['scoreSort2'] = $("#scoreSort2")[0].innerHTML;

		//filterScores();
		showScores();
	}

	if (num != idTable['num']) {
		idTable['num'] = num;
		//filterScores();
		showScores();
	}

	/*var scoreSort1 = $("#scoreSort1")[0].innerHTML;
	var scoreSort2 = $("#scoreSort2")[0].innerHTML;*/


	/*if (scoreSort1 != idTable['scoreSort1']) {
		idTable['scoreSort1'] = scoreSort1
	}
	if (scoreSort2 != idTable['scoreSort2']) {
		idTable['scoreSort2'] = scoreSort2
	}*/

	//drawing
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, w, h);

	//ctx.fillStyle = "orange";
	//ctx.fillRect(doge.x1, doge.y1, (doge.x2 - doge.x1), (doge.y2 - doge.y1));
ctx.drawImage(img, doge.x1, doge.y1);

	for (var i in pipes) {
		ctx.fillStyle = "green";
		//top half
		ctx.fillRect(pipes[i].x1, 0, 150, pipes[i].gapY1);
		//bot half
		ctx.fillRect(pipes[i].x1, pipes[i].gapY2, 150, (h - pipes[i].gapY2));

	
	}

	ctx.fillText("score: " + score, 5, h-10);
}

function Pipe (x1, width, gapY1, gapY2) {
	this.x1 = x1;
	this.x2 = x1 + width;
	this.gapY1 = gapY1;
	this.gapY2 = gapY2;
	this.counted = false;

	//didnt work
	/*this.moveLeft = function () {
		this.x1 -= 4;
		this.x2 -= 4;
	}*/

	this.checkCollision = function (thisDoge) {
		//hitting top pipe
		if (thisDoge.y1 < this.gapY1 && thisDoge.x2 > this.x1 && thisDoge.x1 < this.x2) {
			return true;
	}

	
//hitting bottom pipe
if (thisDoge.y2 > this.gapY2 && thisDoge.x2 > this.x1 && thisDoge.x1 < this.x2) {
			return true;
}

	}


}

function doge (x1, x2, y1, y2, direction, a) {
	this.x1 = x1;
	this.x2 = x2;
	this.y1 = y1;
	this.y2 = y2;
	this.direction = direction;
	//acceleration
	this.a = a;

	this.jump = function () {
		this.a = 14;
	}

	this.wallCollision = function () {
		if (this.a >= 0) {
			if (this.y1 <= 0) {
				init();
			}
		}
		if (this.a <= 0) {
			if (this.y2 >= h) {
				init();
			}
		}
	}
}




var pipesCounter = 0;

$(document).keydown(function(e){
	e.preventDefault();
	switch(e.which) {
		case 32:
			doge.jump();
			break;
		default:
			//filterScores();
			//showScores();
			break;
	}
});



$('#canvas').on('touchstart', function(){
	doge.jump();
});

var img = new Image();
    $(img).attr({
        src: "doge.png"
    });

function incScore () {
	score++;
}

/*function scores (score) {
	$.ajax({
           url : "https://www.dropbox.com/s/l2m5mth4c124aer/scores.txt",
           dataType: "text",
           success : function (data) {
               $("#text").text(data);
           }
       });
}*/


});
