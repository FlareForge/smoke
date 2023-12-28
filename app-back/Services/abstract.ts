import AbstractScanner from "./Scanner/abstract";
import AbstractStorage from "./Storage/abstract";
import AbstractEmulatorManager from "./Emulator/abstractManager";
import AbstractMetadata from "./Metadata/abstract";
import AbstractModManager from "./Mods/abstractManager";
import AbstractAccount from "./Account/abstract";
import AbstractController from "./Controller/abstract";
import AbstractFriends from "./Friends/abstract";

export const abstractServices = {
    Account: AbstractAccount,
    Emulator: AbstractEmulatorManager,
    Metadata: AbstractMetadata,
    Mods: AbstractModManager,
    Scanner: AbstractScanner,
    Storage: AbstractStorage,
    Controller: AbstractController,
    Friends: AbstractFriends,
}