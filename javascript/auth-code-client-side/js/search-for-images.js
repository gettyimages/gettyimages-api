import { apiServer } from "./common.js";
window.onload = () => {
    search();
};

function search() {
    const accessToken = sessionStorage.getItem("access_token");
    const headers = new Headers();
    headers.set("api-key", localStorage.getItem("api_key"));
    headers.set("authorization", `Bearer ${accessToken}`);
    const url = new URL(`${apiServer}/v3/search/images/creative`);
    url.searchParams.set("page_size", "100");
    url.searchParams.set("fields", "title,preview,referral_destinations");
    url.searchParams.set("phrase", "corgi");
    fetch(url,
        {
            method: "GET",
            headers: headers
        }
    ).then((response) => {
        if (response.ok) {
            response.json().then((body) => {
                const div = document.getElementById("searchResults");
                body.images.forEach(i => {
                    const link = document.createElement("a");
                    link.setAttribute("href", i.referral_destinations[0].uri);
                    link.setAttribute("target", "_blank");
                    const imgTag = document.createElement("img")
                    imgTag.setAttribute("src", i.display_sizes[0].uri);
                    imgTag.setAttribute("alt", i.title);
                    imgTag.setAttribute("title", i.title);
                    link.appendChild(imgTag);
                    div.appendChild(link);
                });
            });
        } else if (response.status == 401) {
            console.log("refreshing token...")
            window.location.assign("/get-token.html?refresh=1");
        }
    });
}
