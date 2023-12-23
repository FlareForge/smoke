import { Service } from "../abstract";

export type Emulator = {
    id: string;
    name: string;
    platform: string;
    icon: string;
    link: string;
    installed: boolean;

    path?: string;
    args?: string[];
    ext?: string;
    mapping?: any;
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

    async addCustomEmulator(_emulator: Omit<Emulator, 'id'>) {
        return null;
    }

    async removeCustomEmulator(_id) {
        return null;
    }

    async getConfiguration(_id): Promise<any> {
        return null;
    }

    async setConfiguration(_id, _configuration) {
        return null;
    }
}