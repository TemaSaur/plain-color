const modeButton = document.querySelector("#party-mode");
let mode = false;
let hue = 0;
const step = 1
const ms = 50;

modeButton.onclick = () => {
	modeButton.classList.toggle("active");
	mode = true;
}
party()

function inc(n, s, k = 360) {
	return (n + s) % k;
}
// TODO
// make function for #color and #color-pick to change  
function party() {

	document.body.style.background = `hsl(${hue}, 100%, 50%)`;
	hue = inc(hue, step)

	setTimeout(party, ms);
}
