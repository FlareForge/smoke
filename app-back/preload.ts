import Services, { getServicesData, toggleService, changePriority, cleanServices } from './Services';
const { contextBridge, ipcRenderer } = require('electron');

const context = {
    isApp: true,
    Services,
    toggleStartOnBoot: (startOnBoot) => ipcRenderer.invoke('toggle-startup', startOnBoot),
    toggleService: (serviceName, serviceId) => toggleService(serviceName, serviceId),
    changePriority: (serviceName, serviceId, priority) => changePriority(serviceName, serviceId, priority),
    getServicesData: () => getServicesData(),
    open: (url) => ipcRenderer.invoke('open-url', url),
    fullscreen: () => ipcRenderer.invoke('fullscreen-app'),
    maximize: () => ipcRenderer.invoke('maximize-app'),
    minimize: () => ipcRenderer.invoke('minimize-app'),
    close:  () => ipcRenderer.invoke('close-app'),
    closeOverlay: () => ipcRenderer.invoke('close-overlay'),
};

contextBridge.exposeInMainWorld('app', context);

declare global {
    interface Window {
        app: typeof context;
    }

    interface WindowEventMap {
        'fullscreen': CustomEvent<{fullscreen:boolean}>;
        'overlay-open': CustomEvent<{open:boolean}>;
    }
}

Services.Scanner.scanGames((game) => Services.Metadata.scrapGame(game).then(Services.Storage.addGame))

ipcRenderer.on('fullscreen', (_, fullscreen) => window.dispatchEvent(new CustomEvent('fullscreen',{detail:{fullscreen}})));
ipcRenderer.on('overlay-open', (_, arg) => window.dispatchEvent(new CustomEvent('overlay-open',{detail:arg})));
ipcRenderer.on('clean', (_) => cleanServices());

