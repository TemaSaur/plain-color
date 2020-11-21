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
updateIcon("#ff8")

input.onchange = () => {
	let val = input.value;
	var len = val.length;
	// making the string long enough for input[type=color]
	if (len >= 1 && len <= 3) {
		val = concat(val, Math.ceil(6 / len));
	}
	// coloring the bg, making input[type=color] the same active color
	hashVal = "#" + val;
	document.body.style.background = hashVal;
	color.value = hashVal;
	updateIcon(hashVal)
}

color.onchange = () => {
	let c = color.value;
	document.body.style.background = c;
	input.value = color.value.substring(1,7);
	updateIcon("#" + color.value)
}

fs.onclick = () => {
	if (isFullscreen())
		fullscreenOff();
	else
		fullscreenOn();
}


/////////////////// 

function onImageLoaded(link, fill) {
	let canvas = document.createElement("canvas");
	canvas.width = 16;
	canvas.height = 16;
	let ctx = canvas.getContext("2d");

	ctx.beginPath();
	ctx.arc(8, 8, 7, 0, 2 * Math.PI);
	ctx.fillStyle = fill
	ctx.fill();

	link.type = "image/x-icon";
	link.href = canvas.toDataURL();
}



function updateIcon(fill) {

	let link = document.querySelector("link[rel~='icon']");
	if (!link) {
		link = document.createElement("link");
		link.setAttribute("rel", "shortcut icon");
		document.head.appendChild(link);
	}
	let faviconUrl = link.href || window.location.origin + "/favicon.ico";


	let img = document.createElement("img");
	img.addEventListener("load", () => onImageLoaded(link, fill));
	img.src = faviconUrl;

}



