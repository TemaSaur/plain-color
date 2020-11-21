// repeat string *str* *num* times
function concat (str, num) {
	let out = "";
	while (num--) out += str;
	return out;
}

// check wether the browser window is in FS mode 
function isFullscreen() {
	return window.screenTop && window.screenY;
}

/* stolen code */
// enable fullscreen
function fullscreenOn() {
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.webkitRequestFullscreen) {
		// Safari 
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) {
		// IE 11
		elem.msRequestFullscreen();
	}
}
// disable fullscreen
function fullscreenOff() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) {
		// Safari
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) {
		// IE11
		document.msExitFullscreen();
	}
}

/* Variables */
let input = document.querySelector("#color");
let color = document.querySelector("#color-pick");
const fs = document.querySelector("#fullscreen");
const elem = document.documentElement;

/* Main script */
input.onchange = () => {
	let a = input.value;
	var len = a.length;
	// making the string long enough for input[type=color]
	if (len >= 1 && len <= 3) {
		a = concat(a, Math.ceil(6 / len));
	}
	// coloring the bg, making input[type=color] the same active color
	document.body.style.background = '#' + a;
	color.value = '#' + a;
}

color.onchange = () => {
	let c = color.value;
	document.body.style.background = c;
	input.value = color.value.substring(1,7);
}

fs.onclick = () => {
	if (isFullscreen())
		fullscreenOff();
	else
		fullscreenOn();
}