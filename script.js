$(document).ready(function () {

var ctx = $('#canvas')[0].getContext('2d');
var w = $('#canvas').width();
var h = $('#canvas').height();

var doge = new doge(50, 125, h/2-25, h/2+25, 0, 15);

var pipes = [];

function init () {
	if(typeof game_loop != "undefined") clearInterval(game_loop);
							 game_loop = setInterval(Paint, 25);
}

init();

function reset () {
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
	if (pipesCounter >= 150 || pipes.length === 0) {
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
		if (pipes[i].checkCollision(doge)){ reset();}
		if (pipes[i].counted = false && pipes[i].x2 < doge.x1) {
			prompt("asdf","asdf");
			pipes[i].counted = true;
			score = score + 1;
}
	}

	//control doge
	doge.y1 -= doge.a;
	doge.y2 -= doge.a;
	

		if (doge.y1 <= 0 || doge.y2 >= h) {
			reset();
			init();
			return;
		}

	if (doge.a > -16) {
		doge.a -= 1
	}
	
	

	//drawing
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, w, h);

	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);

	//ctx.fillStyle = "orange";
	//ctx.fillRect(doge.x1, doge.y1, (doge.x2 - doge.x1), (doge.y2 - doge.y1));
ctx.drawImage(img, doge.x1, doge.y1);

	for (var i in pipes) {
		ctx.fillStyle = "green";
		//top half
		ctx.fillRect(pipes[i].x1, 0, 150, pipes[i].gapY1);
		//bot half
		ctx.fillRect(pipes[i].x1, pipes[i].gapY2, 150, (h - pipes[i].gapY2));

	ctx.fillText("score: " + score, 5, h-10);
	}
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


var score = 0;

var pipesCounter = 0;

$(document).keydown(function(e){
	switch(e.which) {
		case 32:
			doge.jump();
			break;
		default:
			break;

	}
});

var img = new Image();
    $(img).attr({
        src: "doge.png"
    });


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
