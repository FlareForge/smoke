import AbstractScanner from "./abstract";
import { BASE_URL, anonKey } from "../smoke.config";
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

export default class IGDBMetadata extends AbstractScanner {

    async scrapGame(game) {
        const data = await fetch(`/search-game/${game.id}`, {
            query: game.name
        });

        return {
            ...game,
            name: game.name,
            image: data?.result?.cover,
            banner: data?.result?.banner,
            description: "No description yet",
        };
    }

};
