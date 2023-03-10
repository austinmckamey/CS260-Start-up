function includeHTML() {
	var z, i, elmnt, file, xhttp;
	/*loop through a collection of all HTML elements:*/
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
	elmnt = z[i];
	/*search for elements with a certain atrribute:*/
	file = elmnt.getAttribute("include-html");
	if (file) {
		/*make an HTTP request using the attribute value as the file name:*/
		xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {elmnt.innerHTML = this.responseText;}
			if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
			/*remove the attribute, and call this function once more:*/
			elmnt.removeAttribute("include-html");
			includeHTML();
		}
		}      
		xhttp.open("GET", file, true);
		xhttp.send();
		/*exit the function:*/
		return;
	}
	}
}

function login() {
	const name = document.querySelector("#name").value;
	const password = document.querySelector("#password").value;

	if (name && password) {
  		localStorage.setItem("userName", name);
		localStorage.setItem("theme", "normal");
		location.href = "app/pages/play/play.html";
	} else {
		document.querySelector("#alertMsg").innerHTML = produceMessage(name, password);
		const alertBox = document.querySelector("#alertBox");
		alertBox.style.display = "block";
		alertBox.style.animation = "fadeOut 5s";
		setTimeout(() => {
			alertBox.style.display = "none";
			alertBox.style.animation = "";
		}, 5000); 
	}
}

function produceMessage(name, password) {
	if (!name && !password) {
		return "Username and password must be specified!";
	} else if (!name) {
		return "Username must be specified!";
	} else {
		return "Password must be specified!";
	}
}

function closeAlert() {
	const alertBox = document.querySelector("#alertBox");
	alertBox.style.animation = "fadeOut 2s";
	setTimeout(() => {
		alertBox.style.display = "none";
		alertBox.style.animation = "";
	}, 500); 
}

includeHTML();