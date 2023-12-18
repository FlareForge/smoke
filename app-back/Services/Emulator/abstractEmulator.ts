export default class AbstractEmulator{

    name = "emulator";
    platform = "PLATFORM";
    icon = "";
    link = "";
    layoutGuide = "";
    ext = "";

    async uninstall(){}

    async update(){}

    async configure(){}

    async startWithGame(_game, _path){}

    async uninstallGame(_game){}

    async shutdownGame(_game, _path){}

    async install(): Promise<string> {
        return null;
    }

    async isGameRunning(_game, _path): Promise<boolean> {
        return null;
    }
}