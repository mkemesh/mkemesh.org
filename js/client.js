
// Insert date at bottom of page.
document.getElementById("current_year").innerHTML = new Date().getFullYear();

// <input> has automatic event handlers. Get instance and set Event Handler.
const button = document.querySelector('#send');
button.addEventListener('click', sendContactEmail);
const http = new XMLHttpRequest();
let messageLabel = document.querySelector(`#requestStatus`);
const contactName = document.querySelector('#name');
const contactEmail = document.querySelector('#email');
const contactMessage = document.querySelector('#message');

// Send XMLHttpRequest.
function sendRequest(method, endPoint, body) {
	http.open(method, endPoint, true);
	http.send(body);
	http.onreadystatechange = processResponse;
}

// Process XMLHttpRequest.
function processResponse(e) {
	// readystate 4 = done
	// status 200 = success
    if (http.readyState == 4 && http.status == 200) {
		let response = JSON.parse(http.responseText);
		messageLabel.innerHTML = `Message sent!\nForm cleared for privacy🤘`;
		clearForm();
    }
}

// Get values and send email.
function sendContactEmail() {
	if (validateInput()) {
		messageLabel.innerHTML = `Sending message...`;
		const mailEndpoint = "https://api.mkemesh.org/v1/contact-email";
		const payload = {
			name: contactName.value.trim(),
			email: contactEmail.value.trim(),
			message: contactMessage.value.trim()
		};
		sendRequest("POST", mailEndpoint, JSON.stringify(payload));
	} else {
		if(!validateInput()) {
			messageLabel.innerHTML = `Need more info!😱`;
		}
	}
}

// Use any algorithms here to check that contact form input is valid.
function validateInput() {
	if (contactName.value.trim().length == 0 ) return false;
	if (contactEmail.value.trim().length == 0 ) return false;
	if (contactMessage.value.trim().length == 0 ) return false;

	return true;
}

function clearForm() {
	contactName.value = ``;
	contactEmail.value = ``;
	contactMessage.value = ``;
	document.querySelector(`#send`).style.visibility = `hidden`; // Hide button
}

function insertCalendar() {
  let calendarEl = document.querySelector('#fullcalendar');

  let fullcalendar = new FullCalendar.Calendar(calendarEl, {
	plugins: [ 'dayGrid' ]
  });

  fullcalendar.render();
};
insertCalendar();
