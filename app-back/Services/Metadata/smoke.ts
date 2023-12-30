import AbstractScanner from "./abstract";
import { BASE_STORE, BASE_URL, anonKey } from "../smoke.config";
const { ipcRenderer } = require("electron");

const fetch = async (url, data): Promise<any> => {
    return await ipcRenderer.invoke('fetch',{
        url: `${BASE_URL}${url}`,
        options: {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${anonKey}`,
            },
            body: JSON.stringify(data || {}	)
        },
        result: 'json'
    })
}

export default class SmokeMetadata extends AbstractScanner {

    // TODO save images locally
    async scrapGame(game) {
        const data = await fetch(`/search-game/${game.id}`, {
            query: game.name
        });

        const cover = data?.result?.cover ? `${BASE_STORE}/${data?.result?.cover}` : null;
        const banner = data?.result?.banner ? `${BASE_STORE}/${data?.result?.banner}` : null;

        return {
            ...game,
            name: data?.result?.name || game.name,
            image: cover,
            banner: banner,
            description: "No description yet",
        };
    }

};
