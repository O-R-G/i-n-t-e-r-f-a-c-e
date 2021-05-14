/* 
    badge.js    
*/

var canvas,
    context,
    step,
    steps,
    frames,
    delay;
var centerX,
    centerY,
    radius,
    direction;
var rad; 
var hands; 
var counter;

function badge_init() {
    var badge = document.getElementById("badge");
    canvas = badge.getElementsByTagName("canvas")[0];
    context = canvas.getContext("2d");

    // set canvas size based on container
    // canvas is always a square of the minimum dimension
    var computed_width = window.getComputedStyle(badge, null).getPropertyValue('width');
    var computed_width = parseFloat(computed_width, 10)
    var computed_height = window.getComputedStyle(badge, null).getPropertyValue('height');
    var computed_height = parseFloat(computed_height, 10)
    var min_ = Math.min(computed_width, computed_height);
    context.canvas.width = min_;
    context.canvas.height = min_;
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;

    // render
    context.fillStyle = "#FFFFFF";
    context.lineWidth = 8;
    context.strokeStyle = '#60F';
    radius = canvas.width / 2.25;

    // current time
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();

    rad = {
        h: (((h % 12) + m / 60.0) / 6.0) * Math.PI - (Math.PI / 2.0),
        m: (m + s / 60.0) / 30.0 * Math.PI - (Math.PI / 2.0),
        s: s / 30.0 * Math.PI - (Math.PI / 2.0)
    };
    hands = {
        h: radius * 0.75,
        m: radius * 1.25,
        s: radius * 0.95
    };

    // debug
    /*
    console.log('computed_width = ' + computed_width);
    console.log('computed_height = ' + computed_height);
    console.log('canvas.width = ' + canvas.width);
    console.log('canvas.height = ' + canvas.height);
    console.log('centerX = ' + centerX);
    console.log('centerY = ' + centerY);
    */
    console.log(h + ":" + m + ":" + s);
    console.log(rad.h + ":" + rad.m + ":" + rad.s);

    // updates
    counter = 0;
    frames = 360;
    step = 2.0 * Math.PI / frames;
    delay = 5; // ms, factor of 1000 locks seconds
    direction = 1;
    badge_animate();
}

function badge_animate() {
    counter++;
    context.clearRect(0, 0, canvas.width, canvas.height);
    var thisStep = (counter % frames) * step * direction;

    // face
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2.0*Math.PI, false);
    context.stroke();

    // arc
    // get *now* angle 
    // cos = x sin = y

    // eye (m)
    var length = .75;
    var x_ = Math.cos(rad['m']) * hands['m'] + centerX;
    var y_ = Math.sin(rad['m']) * hands['m'] + centerY;
    context.beginPath();
    context.moveTo(x_, y_);
    context.lineTo(Math.cos(rad['m']) * hands['m'] * length + centerX,  
                   Math.sin(rad['m']) * hands['m'] * length + centerY);
    context.stroke();

    // eye (h)
    var x_ = Math.cos(rad['h']) * hands['h'] + centerX;
    var y_ = Math.sin(rad['h']) * hands['h'] + centerY;
    context.beginPath();
    context.arc(x_, y_, radius/15, 0, 2.0*Math.PI, false);
    context.stroke();

    // mouth (ms)
    context.beginPath();
    context.arc(centerX, centerY*1.35, radius/5, 0, thisStep, false);
    context.stroke();

    t = setTimeout('badge_animate()', delay);
}

function badge_start_stop() {
    if (t) {
        clearTimeout(t);
        t = null;
    } else {
        setTimeout('badge_animate()', delay);
    }
}
