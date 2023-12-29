// import { abstractServices } from './Services/available';
import AbstractScanner from "./Services/Scanner/abstract";
import AbstractStorage from "./Services/Storage/abstract";
import AbstractEmulatorManager from "./Services/Emulator/abstractManager";
import AbstractMetadata from "./Services/Metadata/abstract";
import AbstractModManager from "./Services/Mods/abstractManager";
import AbstractAccount from "./Services/Account/abstract";
import AbstractController from "./Services/Controller/abstract";
const { contextBridge, ipcRenderer } = require('electron');

export const abstractServices = {
    Account: AbstractAccount,
    Emulator: AbstractEmulatorManager,
    Metadata: AbstractMetadata,
    Mods: AbstractModManager,
    Scanner: AbstractScanner,
    Storage: AbstractStorage,
    Controller: AbstractController,
}

const track = (path, data) => ipcRenderer.invoke('subway-track', { path, data });

const servicesSubway = Object.fromEntries(
    Object.entries(abstractServices)
    .map(
        (entry) => [
            entry[0],
            Object.fromEntries(
                Object.getOwnPropertyNames(entry[1].prototype)
                .filter((p) => !["constructor", "setServices", "clean"].includes(p))
                .concat(['reload'])
                .map((p) => [
                    p, 
                    (...args) => track(`Services.${entry[0]}.${p}`, args)
                ])
            )
        ]
    )
);

contextBridge.exposeInMainWorld('app', {
    isApp: true,
    Services: servicesSubway,
    open: (url) => ipcRenderer.invoke('open-url', url),
    fullscreen: () => ipcRenderer.invoke('fullscreen-app'),
    maximize: () => ipcRenderer.invoke('maximize-app'),
    minimize: () => ipcRenderer.invoke('minimize-app'),
    close:  () => ipcRenderer.invoke('close-app'),
    closeOverlay: () => ipcRenderer.invoke('close-overlay'),
});

ipcRenderer.on('overlay-open', (_, arg) => window.dispatchEvent(new CustomEvent('overlay-open',{detail:arg})));

