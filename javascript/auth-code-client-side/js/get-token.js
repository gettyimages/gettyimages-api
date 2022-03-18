import { authServer, setErrorMessage } from "./common.js";
const url = new URL(window.location.href);
const pageParams = new URLSearchParams(url.search);

if (pageParams.has("code")) {
    const code = pageParams.get("code");
    console.log(code);
    exchangeCodeForToken(code)
        .then(r => {
            console.log(r);
            if (r.ok) {
                r.json().then(body => {
                    sessionStorage.setItem("access_token", body.access_token);
                    localStorage.setItem("refresh_token", body.refresh_token)
                    window.location.assign("/search-for-images.html");
                });
            } else {
                setErrorMessage("There was a problem exchanging the code for a token.");
            }
        });
} else if (pageParams.has("refresh")) {
    if (localStorage.getItem("refresh_token")) {
        refreshAccessToken()
            .then(r => {
                console.log(r);
                if (r.ok) {
                    r.json().then(body => {
                        sessionStorage.setItem("access_token", body.access_token);
                        window.location.assign("/search-for-images.html");
                    });
                } else {
                    setErrorMessage("There was a problem refreshing the token.");
                }
            });
    } else {
        setErrorMessage("There is no refresh token stored. Please Login.");
    }
}

async function refreshAccessToken() {
    const params = new URLSearchParams();
    params.set("grant_type", "refresh_token");
    params.set("client_id", localStorage.getItem("api_key"));
    params.set("refresh_token", localStorage.getItem("refresh_token"));
    console.log(params.toString());
    const response = await fetch(authServer + "/oauth2/token", {
        method: "POST",
        headers: {
            "content-type": "x-www-form-urlencoded",
        },
        body: params.toString()
    });
    console.log(response);
    return response;
}

async function exchangeCodeForToken(code) {
    const params = new URLSearchParams();
    params.set("grant_type", "authorization_code");
    params.set("redirect_uri", sessionStorage.getItem("redirect_uri"));
    params.set("client_id", localStorage.getItem("api_key"));
    params.set("code", code);
    params.set("code_verifier", sessionStorage.getItem("pkce_code_verifier"));
    console.log(params.toString());
    const response = await fetch(authServer + "/oauth2/token", {
        method: "POST",
        headers: {
            "content-type": "x-www-form-urlencoded",
        },
        body: params.toString()
    });
    console.log(response);
    sessionStorage.removeItem("state");
    sessionStorage.removeItem("pkce_code_verifier");
    return response;
}
