import { BASE_URL, anonKey } from "../smoke.config";
import AbstractMultiplayer from "./abstract";
const { ipcRenderer } = require("electron");
// const xmcl = require("@xmcl/core");
// const xmcli = require("@xmcl/installer");

const fetch = async (url, data, token = null): Promise<any> => {
    return await ipcRenderer.invoke('fetch',{
        url: `${BASE_URL}${url}`,
        options: {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token || anonKey}`,
                ...(token ? { "apiKey": anonKey } : {})
            },
            body: JSON.stringify(data || {}	)
        },
        result: 'json'
    })
}

export default class SmokeMultiplayer extends AbstractMultiplayer {
    
    async getServers(game) {
        if(!game.smoke_id) return [];
        const token = await ipcRenderer.invoke('get-session-storage', 'smoke-token');
        const result = await fetch(`/get-servers`, { game: game.smoke_id }, token);
        return result?.servers || [];
    }

    async gameSupportMultiplayer(_game: any) {
        if(!_game.smoke_id) return false;
        return true;
    }

    async gameHasMultiplayerMod(_game: any) {
        if(!_game.smoke_id) return false;
        return false;
    }

    async playOnServer(game: any, server: any) {
        if(!game.smoke_id) return false;
        // if(![217178, 225490].includes(game.smoke_id)) return false;
        // const javaPath = "C:\\Program Files\\Java\\jdk-19\\bin\\java.exe";
        // const gamePath = await ipcRenderer.invoke("get-roaming-path", ".minecraft");
        // const versionString = server.version || "1.20.1";
        // try{
        //     await xmcl.Version.parse(gamePath, versionString);
        // }catch(e) {
        //     try{
        //         const version = (await xmcli.getVersionList()).versions.find(v => v.id === versionString);
        //         await xmcli.install(version, gamePath);
        //     }catch(e) {
        //         console.error(e)
        //     }
        // }
        // await xmcl.launch({
        //     gamePath: gamePath,
        //     javaPath,
        //     version: versionString,
        //     server: {
        //         ip: server.address,
        //     }
        // });
    }
}