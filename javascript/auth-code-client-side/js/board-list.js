import { apiServer } from "./common.js";
window.onload = () => {
    search();
};

function search() {
    const accessToken = sessionStorage.getItem("access_token");
    const headers = new Headers();
    headers.set("api-key", localStorage.getItem("api_key"));
    headers.set("authorization", `Bearer ${accessToken}`);
    const url = new URL(`${apiServer}/v3/boards`);
    url.searchParams.set("pageSize", "30");
    url.searchParams.set("page", "1");
    fetch(url,
        {
            method: "GET",
            headers: headers
        }
    ).then((response) => {
        if (response.ok) {
            response.json().then((body) => {
                const div = document.getElementById("boards");
                body.boards.forEach(b => {
                    if (b.asset_count > 0) {
                        const link = document.createElement("a");
                        link.setAttribute("href", `https://www.gettyimages.com/collaboration/boards/${b.id}`);
                        link.setAttribute("target", "_blank");
                        div.appendChild(link);
                        const imgTag = document.createElement("img")
                        imgTag.setAttribute("src", b.last_updated_asset.thumb);
                        imgTag.setAttribute("alt", b.name);
                        imgTag.setAttribute("title", b.name);
                        const text = document.createTextNode(b.name);
                        imgTag.append(text);
                        link.appendChild(imgTag);
                    }
                });
            });
        } else if (response.status == 401) {
            console.log("refreshing token...")
            window.location.assign("/get-token.html?refresh=1");
        }
    });
}
