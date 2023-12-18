import { Service } from "../abstract";

export type Emulator = {
    id: string;
    name: string;
    platform: string;
    icon: string;
    link: string;
    installed: boolean;
};

export default class AbstractEmulatorManager extends Service {

    async startGame(_game){}

    async install(_id){}

    async uninstall(_id){}

    async uninstallGame(_game){}

    async shutdownGame(_game){}

    async scanFolder(_callback){}

    async getEmulators(): Promise<Emulator[]> {
        return [];
    }

    async getCurrentLayoutGuide(): Promise<string> {
        return null;
    }

    async isGameRunning(_game): Promise<boolean> {
        return null;
    }

    async getEmulatorPath(_id): Promise<string> {
        return null;
    }
}