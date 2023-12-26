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
    
    schema = {
        name: {
            type: 'string',
            label: 'Name'
        },
        platform: {
            type: 'string',
            label: 'Platform'
        },
        ext: {
            type: 'string',
            label: 'Extension'
        },
        path: {
            type: 'string',
            label: 'Path'
        },
        args: {
            type: 'array',
            label: 'Arguments'
        },
        icon: {
            type: 'string',
            label: 'Icon'
        },
    }

    mapping = {
        "AxisP65537": "z",
        "AxisN65537": "s",
        "AxisN65536": "q",
        "AxisP65536": "d",
        "4294967292": "z",
        "4294967294": "s",
        "4294967295": "q",
        "4294967293": "d",
        "1": "a",
        "2": "b",
        "3": "y",
        "0": "x",
        "4": "l",
        "5": "r",
        "8": "o",
        "9": "u",
    }

    private path = "";
    private args = [];

    constructor(emulator: Emulator){
        super();
        this.setConfiguration(emulator);
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

    async getConfiguration(): Promise<Emulator> {
        return {
            id: this.id,
            name: this.name,
            platform: this.platform,
            icon: this.icon,
            link: this.link,
            installed: true,
            path: this.path,
            args: this.args,
            ext: this.ext,
            mapping: this.mapping,
        }
    }

    async setConfiguration(_configuration) {
        this.id = _configuration.id;
        this.name = _configuration.name;
        this.platform = _configuration.platform;
        this.icon = _configuration.icon;
        this.path = _configuration.path;
        this.ext = _configuration.ext;
        this.args = _configuration.args;
        this.mapping = _configuration.mapping || this.mapping;
        if(!this.args.length && this.args?.[0]) this.args = Object.values(this.args);
    }

    async getMapping() {
        return this.mapping;
    }
}