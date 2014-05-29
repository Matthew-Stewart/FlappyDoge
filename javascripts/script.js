(function($) {
$(document).ready(function(){

  // putting lines by the pre blocks
  $("pre").each(function(){
    var pre = $(this).text().split("\n");
    var lines = new Array(pre.length+1);
    for(var i = 0; i < pre.length; i++) {
      var wrap = Math.floor(pre[i].split("").length / 70)
      if (pre[i]==""&&i==pre.length-1) {
        lines.splice(i, 1);
      } else {
        lines[i] = i+1;
        for(var j = 0; j < wrap; j++) {
          lines[i] += "\n";
        }
      }
    }
    $(this).before("<pre class='lines'>" + lines.join("\n") + "</pre>");
  });

  var headings = [];

  var collectHeaders = function(){
    headings.push({"top":$(this).offset().top - 15,"text":$(this).text()});
  }

  if($(".markdown-body h1").length > 1) $(".markdown-body h1").each(collectHeaders)
  else if($(".markdown-body h2").length > 1) $(".markdown-body h2").each(collectHeaders)
  else if($(".markdown-body h3").length > 1) $(".markdown-body h3").each(collectHeaders)

  $(window).scroll(function(){
    if(headings.length==0) return true;
    var scrolltop = $(window).scrollTop() || 0;
    if(headings[0] && scrolltop < headings[0].top) {
      $(".current-section").css({"opacity":0,"visibility":"hidden"});
      return false;
    }
    $(".current-section").css({"opacity":1,"visibility":"visible"});
    for(var i in headings) {
      if(scrolltop >= headings[i].top) {
        $(".current-section .name").text(headings[i].text);
      }
    }
  });

  $(".current-section a").click(function(){
    $(window).scrollTop(0);
    return false;
  })
  
  var ctx = $('#canvas')[0].getContext('2d');
var w = $('#canvas').width();
var h = $('#canvas').height();

var doge = new doge(50, 100, h/2-25, h/2+25, 0, 15);

var pipes = [];

function init () {
	//doge = new doge(50, 100, h/2-25, h/2+25, 0, 15);
	//pipes = [];
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
		if (pipes[i].checkCollision(doge)) reset();
	}

	//control doge
	doge.y1 -= doge.a;
	doge.y2 -= doge.a;


		if (doge.y1 <= 0 || doge.y2 >= h) {
			reset();
			init();
			return;
		}

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
	switch(e.which) {
		case 32:
			doge.jump();
			break;
		default:
			break;

	}
});


function scores (score) {
	$.ajax({
           url : "https://www.dropbox.com/s/l2m5mth4c124aer/scores.txt",
           dataType: "text",
           success : function (data) {
               $("#text").text(data);
           }
       });
}
  
});
})(jQuery)
