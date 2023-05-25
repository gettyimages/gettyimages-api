const authServer = "https://authentication.gettyimages.com";
const apiServer = "https://api.gettyimages.com";

function generateRandomString() {
    var array = new Uint32Array(28);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
}

function sha256(plain) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
}

function base64urlencode(str) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function pkceChallengeFromVerifier(v) {
    const hashed = await sha256(v);
    return base64urlencode(hashed);
}

function setErrorMessage(message) {
    const messageDiv = document.getElementById("message");
    const span = document.createElement("span");
    span.innerText = message;
    messageDiv.appendChild(span);
    messageDiv.appendChild(document.createElement("p"));
    const link = document.createElement("a");
    link.setAttribute("href", "index.html");
    link.innerText = "<<Back to main page";
    messageDiv.appendChild(link);
}

function clearAllStorage() {
    localStorage.clear();
    sessionStorage.clear();
}

export { authServer, apiServer, clearAllStorage, setErrorMessage, generateRandomString, pkceChallengeFromVerifier, sha256 }
