import { abstractServices, hiddenProperties } from './Services/abstract';
const { contextBridge, ipcRenderer } = require('electron');

const track = (path, data) => ipcRenderer.invoke('subway-track', { path, data });

const servicesSubway = Object.fromEntries(
    Object.entries(abstractServices)
    .map(
        (entry) => [
            entry[0],
            Object.fromEntries(
                Object.getOwnPropertyNames(entry[1].prototype)
                .filter((p: typeof hiddenProperties[number]) => !hiddenProperties.includes(p))
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

