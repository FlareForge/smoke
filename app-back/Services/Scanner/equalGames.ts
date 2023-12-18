import AbstractScanner from "./abstract";
const path = require("path");
const { ipcRenderer } = require("electron");

const scan = async (arg): Promise<[]> => await ipcRenderer.invoke("equal-games-scan-wrapper", arg);

export default class WindowsScanner extends AbstractScanner {

    async scanGames(callback) {
        const callbackW = (game) => {
            callback({
                name: game.name,
                path: game.path,
                commands: game.commands,
                emulator: "native",
            });
        }
        const launchers = ['steam', 'epicgames', 'riotgames', 'gog', 'blizzard', 'origin', 'amazon', 'ubisoft']
        launchers.forEach(launcher => scan(launcher).then(r => r.forEach(callbackW)));
    }

    async selectGame() {
        const dirPath = await ipcRenderer.invoke("open-file-dialog");
        const game = await this.preScrapGame(dirPath);
        return game;
    }

    async preScrapGame(gamePath) {
        const name = path.basename(path.dirname(gamePath));
        const game = {
            name,
            path: gamePath,
            emulator: "",
        }
        if(path.extname(gamePath).toLowerCase() === ".exe"){
            game.emulator = "native";
        }else{
            game.name = path.basename(gamePath, path.extname(gamePath));
        }
        return game;
    }

};