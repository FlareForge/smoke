export default class AbstractEmulator{

    name = "emulator";
    platform = "PLATFORM";
    icon = "";
    link = "";
    layoutGuide = "";
    ext = "";
    schema = {};

    async uninstall(){}

    async update(){}

    async startWithGame(_game, _path){}

    async uninstallGame(_game){}

    async shutdownGame(_game, _path){}

    async install(): Promise<string> {
        return null;
    }

    async isGameRunning(_game, _path): Promise<boolean> {
        return null;
    }

    async getConfiguration(): Promise<any> {
        return null;
    }

    async setConfiguration(_configuration) {
        return null;
    }

    async getMapping(): Promise<any> {
        return {};
    }
}