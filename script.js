$(document).ready(function () {

var ctx = $('#canvas')[0].getContext('2d');
var w = $('#canvas').width();
var h = $('#canvas').height();

function init () {
	doge = new doge(50, 100, h/2-25, h/2+25, 0, 15);
	pipes = [];
	if(typeof game_loop != "undefined") clearInterval(game_loop);
							 game_loop = setInterval(Paint, 25);
}

init();

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
		pipes[i].checkCollision(doge);
	}

	//control doge
	doge.y1 -= doge.a;
	doge.y2 -= doge.a;
	
	//collision
	//if (this.a >= 0) {
		if (doge.y1 <= 0) {
			init();
			return;
		}
	//}
	//if (this.a <= 0) {
		if (doge.y2 >= h) {
			init();
			return;
		}
	//}

	if (doge.a > -15) {
		doge.a -= 1
	}
	


	//drawing
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, w, h);

	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);

	ctx.fillStyle = "orange";
	ctx.fillRect(doge.x1, doge.y1, (doge.x2 - doge.x1), (doge.y2 - doge.y1));

	for (var i in pipes) {
		ctx.fillStyle = "green";
		//top half
		ctx.fillRect(pipes[i].x1, 0, 150, pipes[i].gapY1);
		//bot half
		ctx.fillRect(pipes[i].x1, pipes[i].gapY2, 150, (h - pipes[i].gapY2));
	}
}

function Pipe (x1, width, gapY1, gapY2) {
	this.x1 = x1;
	this.x2 = x1 + width;
	this.gapY1 = gapY1;
	this.gapY2 = gapY2;

	//didnt work
	/*this.moveLeft = function () {
		this.x1 -= 4;
		this.x2 -= 4;
	}*/

	this.checkCollision = function (thisDoge) {

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

var doge;

var pipes;

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

});