var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

var canvasOffset = $("#canvas").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;

// animation variables
var currentX = 10;
var currentY = 10;
var frameCount = 60;
var timer;
var points;
var currentFrame;


function animate() {
    var point = points[currentFrame++];
    draw(point.x, point.y);

    // refire the timer until out-of-points
    if (currentFrame < points.length) {
        timer = setTimeout(animate, 1000 / 60);
    }
}

function linePoints(x1, y1, x2, y2, frames) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    var length = Math.sqrt(dx * dx + dy * dy);
    var incrementX = dx / frames;
    var incrementY = dy / frames;
    var a = new Array();

    a.push({
        x: x1,
        y: y1
    });
    for (var frame = 0; frame < frames - 1; frame++) {
        a.push({
            x: x1 + (incrementX * frame),
            y: y1 + (incrementY * frame)
        });
    }
    a.push({
        x: x2,
        y: y2
    });
    return (a);
}
 var colorArray = [
        '#ffaa33',
        '#99ffaa',
        '#00ff00',
        '#ff1100',
  ];
function draw(x, y) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.font = "30px arial";
    ctx.fillStyle = colorArray[Math.floor(Math.random() * colorArray.length)];
    ctx.fillText("Oh Hello", x,y);
}

function handleMouseMove(e) {
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

    // Put your mousedown stuff here
    points = linePoints(currentX, currentY, mouseX, mouseY, frameCount);
    currentFrame = 0;
    currentX = mouseX;
    currentY = mouseY;
    animate();
}

$("#canvas").mousemove(function (e) {
    handleMouseMove(e);
});
$("#canvas").mousedown(function () {
  var a = Math.random() * innerWidth;
   var b = Math.random() * innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.font = "bold 130px arial";
    ctx.fillStyle = colorArray[Math.floor(Math.random() * colorArray.length)];;
    ctx.fillText("BAMMER !", a,b);
});

draw(0, 0);
