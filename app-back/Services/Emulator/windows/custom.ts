import AbstractEmulator from "../abstractEmulator";
import { ipcRenderer } from 'electron';
import { Emulator } from "../abstractManager";

const spawn = async (path, args) => await ipcRenderer.invoke("start-process", { path, args, detach: true });

export default class CustomEmulator extends AbstractEmulator{

    id = ""
    icon = ""
    name = ""
    platform = ""
    ext = ""
    link = ""
    layoutGuide = "./layouts/nds.png"
    custom = true;
    
    private path = "";
    private args = [];

    constructor(emulator: Emulator){
        super();
        this.id = emulator.id;
        this.name = emulator.name;
        this.platform = emulator.platform;
        this.icon = emulator.icon;
        this.path = emulator.path;
        this.ext = emulator.ext;
        this.args = emulator.args;
        if(!this.args.length && this.args?.[0]) this.args = Object.values(this.args);
    }

    async startWithGame(game, _path){
        await spawn(this.path, this.args.map((arg) => arg.replace('{path}', game.path)));
    }

    async install(){
        return this.path;
    }

    async shutdownGame(_game, _path){
        await ipcRenderer.invoke('kill-process', this.path);
    }

    async isGameRunning(_game, _path){
        const result = await ipcRenderer.invoke('is-process-running', this.path);
        return result.length > 0;
    }

    async uninstallGame(_game){
        return null;
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