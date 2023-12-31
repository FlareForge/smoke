import AbstractScanner from "./Scanner/abstract";
import AbstractStorage, { StorageEvents } from "./Storage/abstract";
import AbstractEmulatorManager from "./Emulator/abstractManager";
import AbstractMetadata from "./Metadata/abstract";
import AbstractModManager from "./Mods/abstractManager";
import AbstractAccount from "./Account/abstract";
import AbstractController from "./Controller/abstract";
import AbstractFriends from "./Friends/abstract";
import AbstractMessages from "./Messages/abstract";

export const abstractServices = {
    Account: AbstractAccount,
    Emulator: AbstractEmulatorManager,
    Metadata: AbstractMetadata,
    Mods: AbstractModManager,
    Scanner: AbstractScanner,
    Storage: AbstractStorage,
    Controller: AbstractController,
    Friends: AbstractFriends,
    Messages: AbstractMessages,
}

export interface abstractEvents {
    Account: null,
    Emulator: null,
    Metadata: null,
    Mods: null,
    Scanner: null,
    Storage: StorageEvents,
    Controller: null,
    Friends: null,
    Messages: null,
}

export const hiddenProperties = [
    "constructor",
    "setServices",
    "setEventEmitter",
    "events",
    "emit",
    "clean",
] as const;