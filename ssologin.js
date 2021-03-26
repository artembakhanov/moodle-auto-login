/**
 * Gets the desired element on the client page and clicks on it
 */
function loginsso() {
	document.querySelector("span#submitButton.submit").click();

	let timerId = setInterval(() => {document.querySelector("span#submitButton.submit").click();}, 300);
	setTimeout(() => { clearInterval(timerId); {} }, 1200);
}

loginsso();