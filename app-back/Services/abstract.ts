import AbstractScanner from "./Scanner/abstract";
import AbstractStorage from "./Storage/abstract";
import AbstractEmulatorManager from "./Emulator/abstractManager";
import AbstractMetadata from "./Metadata/abstract";
import AbstractModManager from "./Mods/abstractManager";
import AbstractAccount from "./Account/abstract";
import AbstractController from "./Controller/abstract";
import AbstractFriends from "./Friends/abstract";
import AbstractMessages from "./Messages/abstract";
import AbstractNotifications from "./Notifications/abstract";
import AbstractForum from "./Forum/abstract";
import AbstractMultiplayer from "./Multiplayer/abstract";

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
    Notifications: AbstractNotifications,
    Forum: AbstractForum,
    Multiplayer: AbstractMultiplayer,
}

export const hiddenProperties = [
    "constructor",
    "setServices",
    "setEventEmitter",
    "events",
    "emit",
    "clean",
] as const;