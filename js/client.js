/// <input> has automatic event handlers. Get instance and set Event Handler.
const button = document.querySelector('#send');
button.addEventListener('click',
	sendContactEMail(
		document.querySelector('#name').value,
		document.querySelector('#email').value,
		document.querySelector('#message').value,
		function (e) { console.log(e) }
	)
);

function sendRequest(method, endPoint, body, callback) {
	var http = new XMLHttpRequest();
	http.open(method, endPoint);
	http.send(body);
	http.onreadystatechange = e => {
		callback(e);
	};
}

function sendContactEMail(name, email, message, callback) {
	var mailEndpoint = "https://api.mkemesh.org/v1/contact-email";
	var payload = {
		name: name,
		email: email,
		message: message
	};
	this.sendRequest("POST", mailEndpoint, JSON.stringify(payload), callback);
}
