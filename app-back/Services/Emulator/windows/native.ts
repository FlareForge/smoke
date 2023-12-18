import AbstractEmulator from "../abstractEmulator";
const path = require("path");
const fs = require("fs").promises;
const { ipcRenderer } = require("electron");

const spawn = async (path, args) => await ipcRenderer.invoke("start-process", { path, args, detach: true });

export default class NativeEmulator extends AbstractEmulator{

    async startWithGame(game, _path){
        if(game?.commands?.launch){
            await spawn(game.commands.launch[0], [ game.commands.launch[1], game.commands.launch[2] ])
        }else{
            await spawn(game.path, [])
        }
    }

    async uninstallGame(game) {
        if(game?.commands?.uninstall){
            await spawn(game.commands.uninstall[0], [ game.commands.uninstall[1], game.commands.uninstall[2] ])
        } else {
            const directory = path.dirname(game.path);
            await fs.rmdir(directory, { recursive: true })
        }
    }

    async shutdownGame(_game, _path){
        return null;
    }

    async isGameRunning(_game, _path){
        return null;
    }
        
    async install(){
        return "nopath"
    }

    async uninstall(){
        return null;
    }

    async update(){
        return null;
    }

    async configure(){
        return null;
    }
}



