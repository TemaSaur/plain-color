function concat (str, num) {
	let out = "";
	while (num--) out += str;
	return out;
}

let input = document.querySelector('#color');
let color = document.querySelector("input[type=color]")

input.onchange = () => {
	let a = input.value;
	var len = a.length;
	if (len >= 1 && len <= 3) {
		a = concat(a, Math.ceil(6 / len));
	}
	document.body.style.background = '#' + a;
	color.value = '#' + a;
}

color.onchange = () => {
	let c = color.value;
	document.body.style.background = c;
}