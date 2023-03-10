function changeTheme() {
	var element = document.body;
	element.classList.toggle("hotdog-mode");
	let theme = localStorage.getItem("theme") == "normal" ? "hotdog-mode" : "normal";
	localStorage.setItem("theme", theme);
}

function initSettings() {
	let theme = localStorage.getItem("theme");
	if (theme == "hotdog-mode") {
		document.querySelector("#hotdog").checked = true;
	}
}

initSettings();