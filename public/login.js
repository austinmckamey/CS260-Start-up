  async function loginUser() {
	loginOrCreate(`/api/auth/login`);
  }
  
  async function createUser() {
	loginOrCreate(`/api/auth/create`);
  }
  
  async function loginOrCreate(endpoint) {
	const userName = document.querySelector('#name')?.value;
	const password = document.querySelector('#password')?.value;
	const response = await fetch(endpoint, {
	  method: 'post',
	  body: JSON.stringify({ email: userName, password: password }),
	  headers: {
		'Content-type': 'application/json; charset=UTF-8',
	  },
	});
	const body = await response.json();
  
	if (response?.status === 200) {
	  localStorage.setItem('userName', userName);
	  location.href = "play.html";
	} else {
	  const modalEl = document.querySelector('#msgModal');
	  modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
	  const msgModal = new bootstrap.Modal(modalEl, {});
	  msgModal.show();
	}
  }
  
  function play() {
	window.location.href = 'play.html';
  }
  
  async function getUser(email) {
	let scores = [];
	// See if we have a user with the given email.
	const response = await fetch(`/api/user/${email}`);
	if (response.status === 200) {
	  return response.json();
	}
  
	return null;
  }
  
  function setDisplay(controlId, display) {
	const playControlEl = document.querySelector(`#${controlId}`);
	if (playControlEl) {
	  playControlEl.style.display = display;
	}
  }

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
		loginUser();
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