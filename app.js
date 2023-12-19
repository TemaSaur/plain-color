/* Variables */
const inputEl = document.querySelector("#color")
const colorEl = document.querySelector("#color-pick")
const fullscreenBtn = document.querySelector("#fullscreen")
const elem = document.documentElement
const defaultColor = "#ffff88"

const onImageLoaded = (link, fill) => {
	let canvas = document.createElement("canvas")
	canvas.width = 16
	canvas.height = 16
	let ctx = canvas.getContext("2d")

	ctx.beginPath()
	ctx.arc(8, 8, 7, 0, 2 * Math.PI)
	ctx.fillStyle = fill
	ctx.fill()

	link.type = "image/x-icon"
	link.href = canvas.toDataURL()
}

const updateIcon = (fill) => {
	let link = document.querySelector("link[rel~='icon']")
	if (!link) {
		link = document.createElement("link")
		link.setAttribute("rel", "shortcut icon")
		document.head.appendChild(link)
	}
	let faviconUrl = link.href || window.location.origin + "/favicon.ico"

	let img = document.createElement("img")
	img.addEventListener("load", () => onImageLoaded(link, fill))
	img.src = faviconUrl
}

// repeat string *str* *num* times
const repeatString = (str, num) => {
	let out = ""
	while (num--) out += str
	return out
}

// check wether the browser window is in FS mode
const isFullscreenActive = () => document.fullscreenElement !== null

/* stolen code */
// enable fullscreen
const enableFullscreen = () => {
	if (elem.requestFullscreen) {
		elem.requestFullscreen()
	} else if (elem.webkitRequestFullscreen) {
		// Safari
		elem.webkitRequestFullscreen()
	} else if (elem.msRequestFullscreen) {
		// IE 11
		elem.msRequestFullscreen()
	}
}
// disable fullscreen
const disableFullscreen = () => {
	if (document.exitFullscreen) {
		document.exitFullscreen()
	} else if (document.webkitExitFullscreen) {
		// Safari
		document.webkitExitFullscreen()
	} else if (document.msExitFullscreen) {
		// IE11
		document.msExitFullscreen()
	}
}

/* Main script */
// console.log(window.location.hash)
const initialColor = window.location.hash ?? defaultColor

document.body.style.background = initialColor
inputEl.value = initialColor.substring(1, 7)
colorEl.value = initialColor
updateIcon(initialColor)

const onInputInput = () => {
	let value = inputEl.value
	const len = value.length
	// making the string long enough for input[type=color]
	if (len >= 2 && len <= 3) {
		value = repeatString(value, Math.ceil(6 / len))
	}
	// coloring the bg, making input[type=color] the same active color
	const hashVal = "#" + value
	document.body.style.background = hashVal
	colorEl.value = hashVal
	window.location.hash = hashVal.toUpperCase()
	updateIcon(hashVal)
}

inputEl.oninput = onInputInput

const onColorInput = () => {
	let colorValue = colorEl.value
	document.body.style.background = colorValue
	inputEl.value = colorValue.substring(1, 7)
	window.location.hash = colorValue.toUpperCase()
	updateIcon(colorValue)
}

colorEl.oninput = onColorInput

const onFullscreenBtnClick = () => {
	if (isFullscreenActive()) disableFullscreen()
	else enableFullscreen()
}

fullscreenBtn.onclick = onFullscreenBtnClick
