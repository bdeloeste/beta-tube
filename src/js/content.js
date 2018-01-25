import youtube from "youtube-finder";
import secrets from "../../secrets.environment";

const client = youtube.createClient({ key: secrets.API_KEY });
const introDiv = document.querySelector("#route-page > div > div:nth-child(3) > div.row > div.col-xs-12 > div:nth-child(1)");
if (introDiv) {
    const newNode = introDiv.cloneNode(false);
    const headerNode = document.createElement("h2");
    headerNode.setAttribute("class", "m-t-2");
    headerNode.innerText = "Video";

    newNode.insertAdjacentElement("afterbegin", headerNode);

    introDiv.insertAdjacentElement("afterbegin", newNode);

    const routeName = document.querySelector("#route-page > div > div:nth-child(1) > h1").innerText;
    const area = document.querySelector("#route-page > div > div:nth-child(1) > div.m-b-half.small.text-warm > a:nth-child(3)").getAttribute("href").split("/").slice(-1)[0].replace(new RegExp("-", "g"), " ");
    const params = {
        part: "snippet",
        q: `${routeName} ${area}`,
        maxResults: 5
    };

    client.search(params, (err, data) => {
        const firstResult = data.items[0];
        const videoId = firstResult.id.videoId;

        const element = document.createElement("iframe");
        element.width = "560";
        element.height = "315";
        element.src = `https://www.youtube.com/embed/${videoId}`;
        element.frameborder = "0";
        element.id = "player-1";

        newNode.appendChild(element);
    });
}