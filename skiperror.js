/**
 * Gets the desired element on the client page and clicks on it
 */
function skipError() {
    var button = document.querySelector("button[type=submit].btn");

    button.click();
}

skipError();