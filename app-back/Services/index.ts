import { abstractServices, hiddenProperties } from "./abstract";
import { EventEmitter } from "./service";
const Store = require('electron-store');
const crypto = require('crypto');

import EqualGamesScanner from "./Scanner/equalGames";
import LocalStorage from "./Storage/local";
import WindowsEmulatorManager from "./Emulator/windows";
import IGDBMetadata from "./Metadata/igdb";
import WindowsModManager from "./Mods/windows";
import AccountManager from "./Account/smoke";
import WindowsController from "./Controller/windows";
import SmokeFriends from "./Friends/smoke";
import SmokeMessages from "./Messages/smoke";
import SmokeNotifications from "./Notifications/smoke";
import SmokeForum from "./Forum/smoke";
import SmokeMultiplayer from "./Multiplayer/smoke";

export const availableServices = {
    Account: {
        abstract: abstractServices.Account,
        Smoke: AccountManager,
    },
    Emulator: {
        abstract: abstractServices.Emulator,
        Windows: WindowsEmulatorManager,
    },
    Metadata: {
        abstract: abstractServices.Metadata,
        IGDB: IGDBMetadata,
    },
    Mods: {
        abstract: abstractServices.Mods,
        Windows: WindowsModManager,
    },
    Scanner: {
        abstract: abstractServices.Scanner,
        EqualGames: EqualGamesScanner,
    },
    Storage: {
        abstract: abstractServices.Storage,
        Local: LocalStorage,
    },
    Controller: {
        abstract: abstractServices.Controller,
        Windows: WindowsController,
    },
    Friends: {
        abstract: abstractServices.Friends,
        Smoke: SmokeFriends,
    },
    Messages: {
        abstract: abstractServices.Messages,
        Smoke: SmokeMessages,
    },
    Notifications: {
        abstract: abstractServices.Notifications,
        Smoke: SmokeNotifications,
    },
    Forum: {
        abstract: abstractServices.Forum,
        Smoke: SmokeForum,
    },
    Multiplayer: {
        abstract: abstractServices.Multiplayer,
        Smoke: SmokeMultiplayer,
    },
}

export const defaultServices = {
    Account: ['Smoke'],
    Emulator: ['Windows'],
    Metadata: ['IGDB'],
    Mods: ['Windows'],
    Scanner: ['EqualGames'],
    Storage: ['Local'],
    Controller: ['Windows'],
    Friends: ['Smoke'],
    Messages: ['Smoke'],
    Notifications: ['Smoke'],
    Forum: ['Smoke'],
    Multiplayer: ['Smoke'],
}

const store = new Store();

const selectedServicesData = store.get('services', defaultServices);
Object.keys(availableServices).forEach(serviceName => selectedServicesData[serviceName] ||= defaultServices[serviceName]);

Object.values(availableServices)
    .forEach(services => Object.values(services)
        .forEach(service => service.id = crypto
            .createHash('sha256')
            .update(service.toString()
        )
        .digest('hex')
    )
);

const EventEmitters = Object.fromEntries(
    Object.entries(availableServices)
    .map((entry) => [ entry[0], new EventEmitter()])
) as {
    [key in keyof typeof availableServices]: EventEmitter
}

const selectedServices = Object.fromEntries(
    Object.entries(selectedServicesData)
    .map(
        (entry) => [
            entry[0],
            (entry[1] as Array<string>)
            .map((service) => availableServices?.[entry?.[0]]?.[service] ? new availableServices[entry[0]][service]() : null)
            .filter(x => x)
        ]
    )
) as {
    [key in keyof typeof availableServices]: InstanceType<typeof availableServices[key]["abstract"]>[]
}

type First<T extends (...args: any) => any> = T extends (first: infer First, ...rest: infer _) => any ? First : never;
type Rest<T extends (...args: any) => any> = T extends (first: any, ...rest: infer Rest) => any ? Rest : never;


// @ts-ignore
const Services = Object.fromEntries(
    Object.entries(availableServices)
    .map(
        (entry) => [
            entry[0],
            Object.fromEntries(
                Object.getOwnPropertyNames(entry[1].abstract.prototype)
                .filter((p: typeof hiddenProperties[number]) => !hiddenProperties.includes(p))
                .concat(['reload'])
                .map((p) => [
                    p, 
                    async (...args) => aggregateResults(await Promise.allSettled(selectedServices[entry[0]].map(service => service[p](...args))))
                ])
                .concat([
                    ['on', (event, listener) => EventEmitters[entry[0]].on(event, listener)],
                    ['off', (event, listenerId) => EventEmitters[entry[0]].off(event, listenerId)],
                    ['clean', (event) => EventEmitters[entry[0]].clean(event)]
                ])
            )
        ]
    )
) as {
    [key in keyof typeof availableServices]: Omit<InstanceType<typeof availableServices[key]["abstract"]>, typeof hiddenProperties[number]> &
    {
        on: (
            event: First<typeof availableServices[key]["abstract"]["prototype"]["emit"]>,
            listener: (...args: Rest<typeof availableServices[key]["abstract"]["prototype"]["emit"]>) => void
        ) => number,
        off: (event: First<typeof availableServices[key]["abstract"]["prototype"]["emit"]>, listenerId: number) => void,
        clean: (event: First<typeof availableServices[key]["abstract"]["prototype"]["emit"]>) => void
    }
}

initService();

export default Services;

async function initService() {
    const entries = Object.entries(selectedServices);
    for (const entry of entries) {
        for (const service of entry[1]) {
            await service.setServices(Services);
            await service.setEventEmitter(EventEmitters[entry[0]]);
        }
    }
}

function aggregateResults(results) {
    results = results
        .filter(result => (result.status === 'fulfilled' && result.value))
        .map(result => result.value)
    if (results.every(result => typeof result === 'string')) return results.join('');
    if (results.every(result => Array.isArray(result))) return results.flat();
    if (results.every(result => typeof result === 'number')) return results.reduce((a, b) => a + b, 0);
    if (results.every(result => typeof result === 'object')) return deepMerge(results);
    if (results.every(result => typeof result === 'boolean')) return results.some(result => result);
    return results?.[0];
}

function deepMerge(objects) {
    if(objects.every(obj => Array.isArray(obj))) return objects.flat();
    const result = {};
    for (const obj of objects) {
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'object' && value !== null) {
                if(Array.isArray(value) && !result[key]) result[key] = []
                result[key] = deepMerge([result[key] ?? {}, value]);
            } else {
                result[key] = result[key] || value;
            }
        }
    }
    return result;
}

export function changePriority(serviceName, serviceIndex, newPriority) {
    const service = selectedServices[serviceName][serviceIndex];
    selectedServices[serviceName].splice(serviceIndex, 1);
    selectedServices[serviceName].splice(newPriority, 0, service);
    selectedServicesData[serviceName].splice(serviceIndex, 1);
    const serviceId = Object.keys(availableServices[serviceName]).find(key => availableServices[serviceName][key].id === service.constructor.id);
    selectedServicesData[serviceName].splice(newPriority, 0, serviceId);
    store.set('services', selectedServicesData);
}

export function toggleService(serviceName, serviceId) {
    const serviceIndex = selectedServices[serviceName].findIndex(service => service.constructor.id === serviceId);

    if (serviceIndex === -1) {
        const availableServiceId = Object.keys(availableServices[serviceName]).find(key => availableServices[serviceName][key].id === serviceId);
        const service = availableServices[serviceName][availableServiceId];
        if (service) {
            selectedServices[serviceName].push(new service());
            selectedServices[serviceName][selectedServices[serviceName].length - 1].setServices(Services);
            selectedServices[serviceName][selectedServices[serviceName].length - 1].setEventEmitter(EventEmitters[serviceName]);
            selectedServicesData[serviceName].push(availableServiceId);
            store.set('services', selectedServicesData);
        }
    } else {
        selectedServices[serviceName][serviceIndex].clean();
        selectedServices[serviceName].splice(serviceIndex, 1);
        selectedServicesData[serviceName].splice(serviceIndex, 1);
        store.set('services', selectedServicesData);
    }
}

export function getServicesData() {
    return Object.fromEntries(
        Object.entries(availableServices).map(
            (entry) => [
                entry[0],
                Object.keys(entry[1])
                .filter(p => p !== 'abstract')
                .sort((a, b) => {
                    const aIndex = selectedServices[entry[0]].findIndex(service => service.constructor.id === availableServices[entry[0]][a].id);// should be outside
                    const bIndex = selectedServices[entry[0]].findIndex(service => service.constructor.id === availableServices[entry[0]][b].id);
                    if (aIndex === -1) return 1;
                    if (bIndex === -1) return -1;
                    return aIndex - bIndex;
                })
                .map(p => ({
                    name: p,
                    id: availableServices[entry[0]][p].id,
                    enabled: selectedServices[entry[0]].some(service => service.constructor.id === availableServices[entry[0]][p].id)
                }))
            ]
        )
    );
}

export function cleanServices() {
    Object.values(selectedServices).forEach((services) => services.forEach(service => service.clean()));
}