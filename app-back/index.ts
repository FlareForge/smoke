const {
    app,
    BrowserWindow,
    ipcMain,
    globalShortcut,
    dialog,
    screen: electronScreen,
} = require("electron");
const path = require("path");
const { exec, execFile, spawn } = require("child_process");
const fs = require("fs");
const https = require("https");
const extract = require("extract-zip");
const Store = require("electron-store");
const openurl = require("open");
const { autoUpdater } = require('electron-updater');

var appWindow = null;
var overlayWindow = null;
var currentGameData = null;

Store.initRenderer();
app.commandLine.appendSwitch("enable-features", "OverlayScrollbar");
app.commandLine.appendSwitch("enable-threaded-compositing");
app.whenReady().then(createWindows);

function createWindows() {
    const { width, height } = electronScreen.getPrimaryDisplay().workAreaSize;

    appWindow = new BrowserWindow({
        width,
        height,
        frame: false,
        backgroundColor: "#010B0E",
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: true, // ! after plugins this should be changed
        },
    });

    overlayWindow = new BrowserWindow({
        width,
        height,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        skipTaskbar: true,
        show: false,
        focusable: false,
        minimizable: false,
        maximizable: false,
        resizable: false,
        movable: false,
        // closable: false,
        fullscreen: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: true, // ! after plugins this should be changed
        },
    });

    appWindow.setMenuBarVisibility(false);
    overlayWindow.setFullScreen(true);

    if (!app.isPackaged) {
        appWindow.loadURL("http://localhost:5173/");
        overlayWindow.loadURL("http://localhost:5173/overlay.html");
    } else {
        appWindow.loadFile("./app-front/.build/index.html");
        overlayWindow.loadFile("./app-front/.build/overlay.html");
    }
    if (process.env.DEV) appWindow.openDevTools();

    appWindow.on("enter-full-screen", () => appWindow.webContents.send("fullscreen", true));
    appWindow.on("leave-full-screen", () => appWindow.webContents.send("fullscreen", false));
    appWindow.on("closed", () => {
        try{overlayWindow.close()}catch(e){}
        app.quit()
    });

    autoUpdater.autoDownload = false;
    autoUpdater.checkForUpdatesAndNotify();
    autoUpdater.on('update-available', () => {
        dialog.showMessageBox({
            type: 'info',
            title: 'Update Available',
            message: 'A new smoke version is available!',
            buttons: ['Install now', 'Update at restart', 'Skip']
        }).then((buttonIndex) => {
            if (buttonIndex.response === 0) {
                autoUpdater.on('update-downloaded', () => {
                    autoUpdater.quitAndInstall();
                });
                autoUpdater.downloadUpdate();
            }
            if (buttonIndex.response === 1) {
                autoUpdater.downloadUpdate();
            }
        });
    });
}

function hideOverlay() {
    if (!overlayWindow) return;
    overlayWindow.hide();
    overlayWindow.focusable = false;
}

function showOverlay() {
    if (overlayWindow.isVisible()) return hideOverlay();
    if(appWindow.isFocused()) return;
    overlayWindow.show();
    overlayWindow.setFullScreen(true);
    overlayWindow.setAlwaysOnTop(true, "screen-saver", 100);
    overlayWindow.focusable = true;
    overlayWindow.webContents.send("overlay-open", currentGameData);
}

app.on("ready", () => globalShortcut.register("Shift+Tab", showOverlay));
app.on("window-all-closed", () => app.quit()); // will have to change this later

app.on("before-quit", () => {
    try{overlayWindow.close()}catch(e){}
    try{appWindow.close()}catch(e){}
});

ipcMain.handle("is-querty", (_) => false);// later
ipcMain.handle("close-overlay", (_) => hideOverlay());
ipcMain.handle("close-app", (_) => appWindow.close());
ipcMain.handle("minimize-app", (_) => appWindow.minimize());
ipcMain.handle("maximize-app", (_) => appWindow.isMaximized() ? appWindow.restore() : appWindow.maximize());
ipcMain.handle("fullscreen-app", (_) => appWindow.setFullScreen(!appWindow.isFullScreen()));
ipcMain.handle("open-url", (_, arg) => openurl(arg));
ipcMain.handle("get-app-path", (_, arg) => app.getPath(arg));
ipcMain.handle("get-bin-path", (_, __) => app.isPackaged ? path.join(process.resourcesPath, "../bin") : path.join(__dirname, "bin"));
ipcMain.handle("open-file-dialog", async (_) => (await dialog.showOpenDialog({properties:["openFile"]})).filePaths[0]);
ipcMain.handle("open-folder-dialog", async (_) => (await dialog.showOpenDialog({properties:["openDirectory"]})).filePaths[0]);
ipcMain.handle("gamechange", (_, arg) => currentGameData = arg);
ipcMain.handle('toggle-startup', (_, arg) => app.setLoginItemSettings({openAtLogin:arg,path:path.join(app.getPath('exe'),'/smoke.exe')}));

const banned = [ "\\Windows\\" ]
const safePath = (_path) => {
    _path = path.normalize(_path);
    if(banned.map((banned) => _path.includes(banned)).some((banned) => banned)) throw new Error('Access denied');
    _path.trim().replace(/\\/g, "\\\\").replace(/["'`{}?|*<>;#=\+&%$]/g, ' ');
    return _path;
}

ipcMain.handle('equal-games-scan-wrapper', (_, arg) => {
    const game_scanner = require("@equal-games/game-scanner");
    return game_scanner[arg].games();
});

ipcMain.handle("unzip", async (_, arg) => {
    return null;
    if (!fs.existsSync(arg.destination)) {
        fs.mkdirSync(arg.destination, { recursive: true });
    }
    await extract(arg.source, { dir: arg.destination });
});

// TODO should be using uid
ipcMain.handle("kill-process", (_, arg) => {
    const path = safePath(arg);
    exec(`taskkill /f /im "${path}"`, (error, _stdout, _stderr) => {
        if (error) {
            console.error('Error:', error);
            return;
        }
    });
});

ipcMain.handle("is-process-running", (_, arg) => {
    const path = safePath(arg);
    return new Promise((resolve) => {
        exec(`tasklist /fi "imagename eq ${path}"`, (error, stdout, _stderr) => {
            if (error) {
                console.error('Error:', error);
                return;
            }
            const isRunning = stdout.split("\n").length > 3;
            resolve(isRunning);
        });
    });
});

ipcMain.handle("start-process", (_, arg) => {
    const path = safePath(arg.path);
    if (!path.endsWith(".exe")) return;
    if(arg.detach){
        spawn(path, arg.args, {
            detached: true,
            stdio: "ignore",
            shell: false,
        }).unref();
        return;
    }else{
        return new Promise((resolve) => {
            execFile(path, arg.args, { shell: false }, (error, _stdout, _stderr) => {
                if (error) {
                    console.error('Error:', error);
                    return;
                }
                resolve(1);
            });
        }
    )}
});

ipcMain.handle("fetch", async (_, arg) => {
    const result = await fetch(arg.url, arg.options);
    switch (arg.result) {
        case "text":
            return await result.text();
        case "json":
            return await result.json();
        default:
            return null;
    }
});

ipcMain.handle("download", (_, arg) => {
    return null;
    return new Promise((resolve, reject) => {
        const downloadFile = (url, destination, redirectsCount = 0) => {
            if (redirectsCount > 5) {
                reject(new Error("Too many redirects"));
                return;
            }
            const file = fs.createWriteStream(destination);
            https
                .get(url, function (response) {
                    console.log("Status", response.statusCode);
                    if (
                        response.statusCode >= 300 &&
                        response.statusCode < 400 &&
                        response.headers.location
                    ) {
                        console.log(`Redirecting to ${response.headers.location}`);
                        downloadFile(
                            response.headers.location,
                            destination,
                            redirectsCount + 1
                        );
                    } else if (response.statusCode !== 200) {
                        reject(
                            new Error(`Download failed: HTTP Status Code: ${response.statusCode}`)
                        );
                    } else {
                        response.pipe(file);
                        file.on("finish", function () {
                            file.close();
                            console.log("Download Completed");
                            resolve(1);
                        });
                    }
                    file.on("error", (err) => {
                        fs.unlink(destination, () => {});
                        reject(new Error(`File write error: ${err.message}`));
                    });
                })
                .on("error", function (err) {
                    fs.unlink(destination, () => {});
                    reject(err);
                });
        };
        const directory = path.dirname(arg.destination);
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }
        downloadFile(arg.url, arg.destination);
    });
});