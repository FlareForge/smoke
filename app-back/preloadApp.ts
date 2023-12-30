import Services, { getServicesData, toggleService, changePriority, cleanServices } from './Services';
const { contextBridge, ipcRenderer } = require('electron');
const crypto = require('crypto');

Services.Scanner.scanGames(async (game) => {
    const id = crypto.createHash('sha256').update(JSON.stringify({path: game.path})).digest('hex');
    const storedGame = await Services.Storage.getGame(id);
    if(storedGame.id) return;
    Services.Metadata.scrapGame(game).then(Services.Storage.addGame);
})

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

ipcRenderer.on('fullscreen', (_, fullscreen) => window.dispatchEvent(new CustomEvent('fullscreen',{detail:{fullscreen}})));
ipcRenderer.on('overlay-open', (_, arg) => window.dispatchEvent(new CustomEvent('overlay-open',{detail:arg})));
ipcRenderer.on('clean', (_) => cleanServices());

ipcRenderer.on('subway-track', async (_, { path, data, nonce }) => {
    const replyEvent = `subway-track-reply-${nonce}`;
    let result, error, tooLate;
    const timeout = setTimeout(() => tooLate = true, 100000);
    try{
        if(path.startsWith('Services.')) {
            const [serviceName, methodName] = path.split('.').slice(1);
            result = await Services[serviceName][methodName](...data);
        }
    }catch(e) {
        error = e;
    }
    if(tooLate) return;
    clearTimeout(timeout);
    ipcRenderer.invoke(replyEvent, {
        result,
        error
    });
});

declare global {
    interface Window {
        app: typeof context;
    }

    interface WindowEventMap {
        'fullscreen': CustomEvent<{fullscreen:boolean}>;
        'overlay-open': CustomEvent<{open:boolean}>;
    }
}