import { authServer, generateRandomString, pkceChallengeFromVerifier, clearAllStorage } from "./common.js";

async function init() {
  const setButton = document.getElementById("setkey");
  setButton.addEventListener("click", event => {
    clearAllStorage();
    setApiKey();
  });

  const resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", event => {
    clearAllStorage();
    document.getElementById("apikey").value = "";
  });

  const refreshButton = document.getElementById("refresh");
  refreshButton.addEventListener("click", event => {
    window.location.assign("get-token.html?refresh=1");
  });

  if (localStorage.getItem("api_key")) {
    document.getElementById("apikey").value = localStorage.getItem("api_key");
  }

  const loginButton = document.getElementById("login");
  loginButton.addEventListener("click", async event => {
    if (!document.getElementById("apikey").value) {
      alert("Please set the API Key.");
    } else {
      const codeVerifier = generateRandomString();
      sessionStorage.setItem("pkce_code_verifier", codeVerifier);
      const codeChallenge = await pkceChallengeFromVerifier(codeVerifier);
      const state = generateRandomString();
      sessionStorage.setItem("state", state);
      const link = document.getElementById("login");
      const url = new URL(`${authServer}/oauth2/auth`);
      const redirectUri = `${window.location.protocol}//${window.location.host}/get-token.html`;
      sessionStorage.setItem("redirect_uri", redirectUri)
      url.searchParams.set("client_id", localStorage.getItem("api_key"));
      url.searchParams.set("response_type", "code");
      url.searchParams.set("redirect_uri", redirectUri)
      url.searchParams.set("state", state);
      url.searchParams.set("code_challenge", codeChallenge);
      url.searchParams.set("code_challenge_method", "S256");
      window.location.assign(url);
    }
  });

  function setApiKey() {
    const apiKey = document.getElementById("apikey").value;
    localStorage.setItem("api_key", apiKey);
  }
}

if (document.readyState === "loading") {
  document.addEventListener('DOMContentLoaded', init);
}
else if (document.readyState === "interactive" || document.readyState === "complete") {
  init();
}
