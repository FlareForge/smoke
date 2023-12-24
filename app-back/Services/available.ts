import AbstractScanner from "./Scanner/abstract";
import AbstractStorage from "./Storage/abstract";
import AbstractEmulatorManager from "./Emulator/abstractManager";
import AbstractMetadata from "./Metadata/abstract";
import AbstractModManager from "./Mods/abstractManager";
import AbstractAccount from "./Account/abstract";
import AbstractController from "./Controller/abstract";

import EqualGamesScanner from "./Scanner/equalGames";
import LocalStorage from "./Storage/local";
import WindowsEmulatorManager from "./Emulator/windows";
import SmokeMetadata from "./Metadata/smoke";
import WindowsModManager from "./Mods/windows";
import AccountManager from "./Account/smoke";
import WindowsController from "./Controller/windows";

export const availableServices = {
    Account: {
        abstract: AbstractAccount,
        Smoke: AccountManager,
    },
    Emulator: {
        abstract: AbstractEmulatorManager,
        Windows: WindowsEmulatorManager,
    },
    Metadata: {
        abstract: AbstractMetadata,
        Smoke: SmokeMetadata,
    },
    Mods: {
        abstract: AbstractModManager,
        Windows: WindowsModManager,
    },
    Scanner: {
        abstract: AbstractScanner,
        EqualGames: EqualGamesScanner,
    },
    Storage: {
        abstract: AbstractStorage,
        Local: LocalStorage,
    },
    Controller: {
        abstract: AbstractController,
        Windows: WindowsController,
    }
}

export const defaultServices = {
    Account: ['Smoke'],
    Emulator: ['Windows'],
    Metadata: ['Smoke'],
    Mods: ['Windows'],
    Scanner: ['EqualGames'],
    Storage: ['Local'],
    Controller: ['Windows'],
}