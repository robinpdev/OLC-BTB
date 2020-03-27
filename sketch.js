var canvas;

//setup for main audio output
let audioContext;
let audioscene;
let source;


// Define room dimensions for resonance (library).
let roomDimensions = {
	width: 3.1,
	height: 2.5,
	depth: 3.4,
};

// Define materials for each of the room’s six surfaces.
// Room materials have different acoustic reflectivity.
let roomMaterials = {
	// Room wall materials
	left: 'brick-bare',
	right: 'curtain-heavy',
	front: 'marble',
	back: 'glass-thin',
	// Room floor
	down: 'grass',
	// Room ceiling
	up: 'transparent',
};

let outside = {
	// Room wall materials
	left: 'transparent',
	right: 'transparent',
	front: 'transparent',
	back: 'transparent',
	// Room floor
	down: 'grass',
	// Room ceiling
	up: 'transparent',
}

let ww = 0;
let wh = 0;

let px = 0;
let py = 0;

function preload() {

}

function setup() {

	createCanvas(windowWidth * 1, windowHeight * 1);
	frameRate(60);

	audioContext = new AudioContext();
	audioscene = new ResonanceAudio(audioContext);
	audioscene.output.connect(audioContext.destination);

	audioscene.setRoomProperties(roomDimensions, outside);

	source = audioscene.createSource();

	ww = windowWidth;
	wh = windowHeight;

	document.addEventListener("mousemove", updatempos, false);

	// pointer lock object forking for cross browser
	canvas = document?.getElementById("defaultCanvas0");

	canvas.requestPointerLock = canvas.requestPointerLock ||
		canvas.mozRequestPointerLock;

	document.exitPointerLock = document.exitPointerLock ||
		document.mozExitPointerLock;

	canvas.onclick = function () {
		canvas.requestPointerLock();
	};
}

let t = 0;

function draw() {
	noFill();
	background(100);
	//clear();
	noStroke();
	translate(0, 0);

	drawroom(roomDimensions, ww / 2, wh / 2, 60);


}

function updatempos(e) {
	px += e.movementX;
	py += e.movementY;
}

function drawroom(iroom, x, y, factor) {
	push();
	stroke(255);
	translate(x, y);

	let rx = iroom.width * factor;
	let ry = iroom.depth * factor;
	line(-rx / 2, ry / 2, rx / 2, ry / 2);
	line(-rx / 2, -ry / 2, rx / 2, -ry / 2);
	line(rx / 2, -ry / 2, rx / 2, ry / 2);
	line(-rx / 2, -ry / 2, -rx / 2, ry / 2);

	drawplayer();

	pop();
}

function drawplayer() {
	fill(0, 0, 200);
	ellipse(px, py, 20, 20);
}

function mouseDragged() {

}

function mousePressed() {

}

function stopVideo() {
	player.stopVideo();
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	console.log("player ready");
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	ww = windowWidth;
	wh = windowHeight;
}

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

class vec {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class vec3 {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = 0;
	}
}

function fillc(color) {
	fill(color.r, color.g, color.b);
}

function strokec(color) {
	stroke(color.r, color.g, color.b);
}