import styled from "styled-components";
import { useModal } from "../Modal";
import { useState, createContext, useContext, useEffect } from "react";
import Loader from "../Loader";
import Icon from "@Components/Icon";

function Settings({ page: _page }) {
    const [page, setPage] = useState(_page || "general");

    let pageContent = null;

    switch (page) {
        case "interface":
            pageContent = <InterfaceSettings />;
            break;
        case "emulators":
            pageContent = <EmulatorsSettings />;
            break;
        case "library":
            pageContent = <LibrarySettings />;
            break;
        case "device":
            pageContent = <DeviceSettings />;
            break;
        case "modules":
            pageContent = <ModulesSettings />;
            break;
        case "account":
            pageContent = <AccountSettings />;
            break;
        default:
            pageContent = <GeneralSettings />;
            break;
    }

    return (
        <SettingsContainer>
            <h1>Settings</h1>
            <Layout>
                <Sections>
                    <Section
                        onClick={() => setPage("general")}
                        $selected={page === "general"}
                    >
                        General
                    </Section>
                    <Section
                        onClick={() => setPage("interface")}
                        $selected={page === "interface"}
                    >
                        Interface
                    </Section>
                    <Section
                        onClick={() => setPage("library")}
                        $selected={page === "library"}
                    >
                        Library
                    </Section>
                    <Section className="soon">Games</Section>
                    <Section
                        onClick={() => setPage("emulators")}
                        $selected={page === "emulators"}
                    >
                        Emulators
                    </Section>
                    <Section className="soon">Mods</Section>
                    <Section
                        onClick={() => setPage("modules")}
                        $selected={page === "modules"}
                    >
                        Modules
                    </Section>
                    <Section className="soon">Addons</Section>
                    <Section
                        onClick={() => setPage("account")}
                        $selected={page === "account"}
                    >
                        Account
                    </Section>
                    <Section
                        onClick={() => setPage("device")}
                        $selected={page === "device"}
                    >
                        Device
                    </Section>
                </Sections>
                <Page>{pageContent}</Page>
            </Layout>
            <div></div>
        </SettingsContainer>
    );
}

function InterfaceSettings() {
    const { settings, setSettings } = useSettings();

    return (
        <>
            <SettingEntry>
                <div>Main Color</div>
                <input
                    type="color"
                    name="body"
                    value={settings.mainColor}
                    onChange={(e) => setSettings({ mainColor: e.target.value })}
                />
            </SettingEntry>
            <SettingEntry>
                <div>Dark Color</div>
                <input
                    type="color"
                    name="body"
                    value={settings.darkColor}
                    onChange={(e) => setSettings({ darkColor: e.target.value })}
                />
            </SettingEntry>
            <SettingEntry>
                <div>Light Color</div>
                <input
                    type="color"
                    name="body"
                    value={settings.lightColor}
                    onChange={(e) =>
                        setSettings({ lightColor: e.target.value })
                    }
                />
            </SettingEntry>
            {/* <SettingEntry>
                <div>Highlight Color</div>
                <input
                    type="color"
                    name="body"
                    value={settings.highlightColor}
                    onChange={(e) =>
                        setSettings({ highlightColor: e.target.value })
                    }
                />
            </SettingEntry> */}
            <SettingEntry>
                <div>Enable Animations</div>
                <input
                    type="checkbox"
                    name="body"
                    checked={settings.enableAnimations}
                    onChange={(e) =>
                        setSettings({ enableAnimations: e.target.checked })
                    }
                />
            </SettingEntry>
            <SettingEntry>
                <div>Enable Blur</div>
                <input
                    type="checkbox"
                    name="body"
                    checked={settings.enableBlur}
                    onChange={(e) =>
                        setSettings({ enableBlur: e.target.checked })
                    }
                />
            </SettingEntry>
        </>
    );
}

function GeneralSettings() {
    const { settings, setSettings } = useSettings();

    return (
        <>
            <SettingEntry>
                <div>Start on boot</div>
                <input
                    type="checkbox"
                    name="body"
                    checked={settings.startOnBoot}
                    onChange={(e) => {
                        window.app.toggleStartOnBoot(e.target.checked);
                        setSettings({ startOnBoot: e.target.checked })
                    }}
                />
            </SettingEntry>
        </>
    );
}


function AccountSettings() {
    const [userData, _setUserData] = useState({
        username: "",
        avatar: "",
    });
    const [timer, setTimer] = useState(null);
    const [nonce, setNonce] = useState(0);

    const updateUserData = () => {
        window.app.Services.Account.getUserData("token", {}).then(_setUserData);
    }

    const pushNewUserData = (_userData) => window.app.Services.Account.setUserData("token", _userData);

    const setUserData = (newUserData) => {
        const _userData = {
            ...userData,
            ...newUserData,
        };
        _setUserData(_userData);
        clearTimeout(timer);
        setTimer(setTimeout(() => pushNewUserData(_userData), 1000));
    }

    const pickFile = async () => {
        var input = document.createElement('input');
        input.type = 'file';
        input.style.display = 'none';
        document.body.appendChild(input);
        input.onchange = async () => {
            if (input.files.length > 0) {
                const file = input.files[0];
                const base64 = await resizeAndConvertImage(file);
                const result = await window.app.Services.Account.changeAvatar("token", {base64});
                if(result) updateUserData();
                setNonce(prev => prev + 1);
            }
            document.body.removeChild(input);
        };
        input.oncancel = () => document.body.removeChild(input);
        input.click();
    };

    const resizeAndConvertImage = (file) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 512;
                canvas.height = 512;
                ctx.drawImage(img, 0, 0, 512, 512);
                canvas.toBlob((blob) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = () => {
                        resolve(reader.result);
                    };
                }, 'image/jpeg');
            };
            img.onerror = (error) => reject(error);
        });
    };

    useEffect(updateUserData, []);
    
    return (
        <>
            <SettingEntry>
                <div>Username</div>
                <input
                    type="text"
                    name="body"
                    value={userData.username}
                    onChange={(e) => setUserData({ username: e.target.value })}
                />
            </SettingEntry>
            <SettingEntry
                style={{height: "100px"}}
            >
                <div>Avatar</div>
                <div
                    onClick={pickFile}
                    className="image"
                    style={userData.avatar ? {
                        backgroundImage: `url(${userData.avatar}?nonce=${nonce})`,
                    } : {}}
                >
                </div>
            </SettingEntry>
        </>
    );
}

function EmulatorsSettings() {
    const [emulators, setEmulators] = useState([]);
    const [loadings, setLoadings] = useState({});
    const [openedEmulator, setOpenedEmulator] = useState(null);

    useEffect(() => {
        updateEmulators();
    }, []);

    const updateEmulators = () => {
        window.app.Services.Emulator.getEmulators().then(setEmulators);
    };

    if (openedEmulator) {
        const emulator = emulators.find((e) => e.id === openedEmulator);
        const platform = emulator.platform;
        const name = emulator.name;

        return (
            <>
                <InstallBtn onClick={() => setOpenedEmulator(null)}>
                    Return
                </InstallBtn>
                <h2>
                    {platform.toUpperCase()} - {name.toLowerCase()}
                </h2>
                <div
                    onClick={() => {
                        window.app.open(emulator.link);
                    }}
                >
                    Author
                </div>
                <div>No settings available yet</div>
            </>
        );
    }

    return (
        <EmulatorList>
            {emulators.map((emulator, i) => (
                <div
                    key={i}
                    onClick={() => setOpenedEmulator(emulator.id)}
                >
                    <img
                        src={emulator.icon || "./platforms/nds.svg"}
                        alt={emulator.name}
                    />
                    <div>{emulator.platform?.toUpperCase()}</div>
                    <div></div>
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            window.app.open(emulator.link);
                        }}
                    >
                        {emulator.name?.toLowerCase()}
                    </div>
                    {emulator.installed ? (
                        <InstallBtn $installed={true}>Installed</InstallBtn>
                    ) : loadings[emulator.id] ? (
                        <InstallBtn $installed={true}>
                            <Loader size="16px" />
                        </InstallBtn>
                    ) : (
                        <InstallBtn
                            onClick={async (e) => {
                                e.stopPropagation();
                                setLoadings({
                                    ...loadings,
                                    [emulator.id]: true,
                                });
                                await window.app.Services.Emulator.install(
                                    emulator.id
                                );
                                setLoadings({
                                    ...loadings,
                                    [emulator.id]: false,
                                });
                                updateEmulators();
                            }}
                        >
                            Install
                        </InstallBtn>
                    )}
                </div>
            ))}
        </EmulatorList>
    );
}

function LibrarySettings() {
    const { settings, setSettings } = useSettings();

    return (
        <>
            <SettingEntry>
                <div>Images Target Size</div>
                <input
                    type="number"
                    name="body"
                    min="10"
                    value={settings.coverSize}
                    onChange={(e) => setSettings({ coverSize: e.target.value })}
                />
            </SettingEntry>
            <SettingEntry>
                <div>Orientation</div>
                <select
                    value={settings.orientation}
                    onChange={(e) =>
                        setSettings({ orientation: e.target.value })
                    }
                >
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                    <option value="square">Square</option>
                </select>
            </SettingEntry>
        </>
    );
}

function DeviceSettings() {
    const [clearing, setClearing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    return (
        <>
            <SettingEntry>
                <div>Clear all data</div>
                <div
                    onClick={async () => {
                        setClearing(true);
                        await window.app.Services.Storage.clear();
                        setClearing(false);
                    }}
                >
                    {clearing ? <Loader size="16px" /> : "Clear"}
                </div>
            </SettingEntry>
            <SettingEntry>
                <div>Delete all emulators</div>
                <div
                    onClick={() => {
                        setDeleting(true);
                        window.app.Services.Emulator.getEmulators().then(
                            (emulators) => {
                                Promise.all(
                                    emulators.map(async (emulator) => {
                                        await window.app.Services.Emulator.uninstall(
                                            emulator.id
                                        );
                                    })
                                ).then(() => {
                                    setDeleting(false);
                                });
                            }
                        );
                    }}
                >
                    {deleting ? <Loader size="16px" /> : "Delete"}
                </div>
            </SettingEntry>
        </>
    );
}

function ModulesSettings() {
    const [modules, setModules] = useState<ReturnType<typeof window.app.getServicesData>>({});

    useEffect(() => {
        updateModules();
    }, []);

    const updateModules = () => {
        setModules(window.app.getServicesData());
    };

    return (
        <>
            {Object.entries(modules).map( ([id, availableModules]) => {
                const enabledModulesLength = availableModules.filter(m => m.enabled).length;
                return <div key={id}>
                    <div> {id} </div>
                    <EmulatorList
                        style={{ height: "auto", marginTop: "10px", marginBottom: "10px" }}
                    >
                        {
                            availableModules.map((module, i) => (
                                <div key={id+i}>
                                    <img
                                        src={"./platforms/nds.svg"}
                                        alt={module.name}
                                    />
                                    <div>{module.name?.toLowerCase()}</div>
                                    <div></div>
                                    <div></div>
                                    {module.enabled && <>
                                        <ModuleOption
                                            $disabled={i==(enabledModulesLength - 1)}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                window.app.changePriority(id, i, i+1);
                                                updateModules();
                                            }}
                                        >
                                            <Icon name="arrow-down-circle" />
                                        </ModuleOption>
                                        <ModuleOption
                                            $disabled={i==0}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                window.app.changePriority(id, i, i-1);
                                                updateModules();
                                            }}
                                        >
                                            <Icon name="arrow-up-circle" />
                                        </ModuleOption>
                                    </>}
                                    {module.enabled ? (
                                        <ModuleOption
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                window.app.toggleService(id, module.id);
                                                updateModules();
                                            }}
                                        >
                                            <Icon name="check-circle" />
                                        </ModuleOption>
                                        
                                    ) : (
                                        <ModuleOption
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                window.app.toggleService(id, module.id);
                                                updateModules();
                                            }}
                                        >
                                            <Icon name="circle" />
                                        </ModuleOption>
                                    )}
                                </div>
                            ))
                        }
                    </EmulatorList>
                </div>
            })}
        </>
    );
}

const ModuleOption = styled.div`
    padding: 0;
    text-align: center;
    width: 25px;
    height: 25px;
    cursor: pointer;
    pointer-events: ${(props: any) => (props.$disabled ? "none" : "all")};
    opacity: ${(props: any) => (props.$disabled ? "0.3" : "1")};
`;

const InstallBtn = styled.div`
    padding: 5px 10px;
    text-align: center;
    width: 90px;
    height: 25px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.15);
    cursor: pointer;
    pointer-events: ${(props: any) => (props.$installed ? "none" : "all")};
    opacity: ${(props: any) => (props.$installed ? "0.5" : "1")};
`;

const EmulatorList = styled.div`
    pointer-events: ${(props: any) => (props.$locked ? "none" : "all")};
    opacity: ${(props: any) => (props.$locked ? "0.5" : "1")};
    display: flex;
    flex-direction: column;
    gap: 0;
    height: 100%;
    border-radius: 18px;
    overflow: hidden;
    background-color: var(--dark);
    overflow-y: overlay;
    overflow-x: hidden;

    & > div {
        box-sizing: border-box;
        width: 100%;
        border: 0;
        background-color: rgba(255, 255, 255, 0.1);
        padding: 10px;
        color: #fff;
        font-weight: 600;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: start;
        gap: 10px;
        cursor: pointer;

        &:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }

        &:nth-child(odd) {
            background-color: rgba(255, 255, 255, 0.05);
        }

        &:nth-child(odd):hover {
            background-color: rgba(255, 255, 255, 0.15);
        }

        & > img {
            width: 20px;
            height: 20px;
            margin-left: 6px;
        }

        & > div:nth-child(3) {
            flex: 1 0 0;
        }

        & > div:nth-child(4) {
            font-size: 18px;
            font-weight: 500;
            text-align: right;
            opacity: 0.5;
            cursor: pointer;
            border-radius: 8px;
            padding: 5px 10px;

            &:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }
        }
    }
`;

const SettingEntry = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    padding: 5px 5px;
    position: relative;
    height: 40px;

    & > *:last-child {
        box-sizing: border-box;
        /* border: 1px solid rgba(255, 255, 255, 0.1); */
        border: 1px solid rgb(131, 131, 131);
        width: 200px;
        height: 100%;
        border-radius: 8px;
        font-size: 17px;
        background-color: rgba(255, 255, 255, 0.3);
        background-size: cover;
        background-position: center center;
        cursor: pointer;
        color: #fff;
        padding: 10px 20px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:focus {
            outline: 0;
        }

        & option {
            background: var(--dark);
            border: 0;
            padding: 10px 20px;
        }

        &.image {
            aspect-ratio: 1/1;
            overflow: hidden;
            height: 100px;
            width: 100px;

            &:hover {
                opacity: 0.8;
            }
        }
    }

    & > input[type="color"]:last-child {
        padding: 0;
        height: 100%;
        overflow: hidden;

        &::-webkit-color-swatch-wrapper {
            padding: 0;
        }
        &::-webkit-color-swatch {
            border: none;
        }
    }

    & > input[type="checkbox"]:last-child {
        width: 30px;
    }

    & > div:first-child {
        flex: 1 0 0;
    }
`;

const SettingsContainer = styled.div`
    display: flex;
    height: 500px;
    padding: 0;
    margin: 0px !important;

    & > h1 {
        margin-left: 20px !important;
        margin-top: 10px !important;
    }

    & > div:last-child {
        display: none !important;
    }
`;

const Layout = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    padding: 0 !important;
    margin: 0 !important;
    margin-top: 15px !important;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Sections = styled.div`
    width: 200px;
    display: flex;
    flex-direction: column;
    gap: 0;
`;

const Section = styled.div`
    padding: 10px 20px;
    font-size: 20px;
    font-weight: ${(props: any) => (props.$selected ? "600" : "400")};
    cursor: pointer;
    transition-duration: 0.1s;
    transition-property: background-color;
    background-color: rgba(255, 255, 255, 0);
    ${(props: any) =>
        props.$selected ? "background-color: rgba(255, 255, 255, 0.1);" : ""}

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

const Page = styled.div`
    flex: 1 0 0;
    height: 100%;
    background-color: var(--grey);
    padding: 20px;
    font-size: 20px;
    box-sizing: border-box;
`;

const defaultSettings = {
    mainColor: "#fa8414",
    darkColor: "#010B0E",
    lightColor: "#01141A",
    highlightColor: "#05ff00",
    overlayBackground: "rgba(0, 0, 0, 0.5)",
    enableAnimations: true,
    enableBlur: true,
    coverSize: 300,
    orientation: "portrait",
    startOnBoot: true,
};

const SettingsContext = createContext<any>({
    openSettings: (_page) => {},
    settings: defaultSettings,
    setSettings: () => {},
});

export const SettingsProvider = ({ children }) => {
    const [settings, _setSettings] = useState(defaultSettings);

    useEffect(() => {
        window.app.Services.Storage.get("settings").then((_settings) => {
            setSettings({
                ...defaultSettings,
                ...settings,
                ..._settings,
            });
        });
    }, []);

    const setSettings = (newSettings) => {
        const updatedSettings = {
            ...defaultSettings,
            ...settings,
            ...newSettings,
        };
        _setSettings(updatedSettings);
        window.app.Services.Storage.store("settings", updatedSettings);
        if(updatedSettings.startOnBoot) window.app.toggleStartOnBoot(true);
    };

    const value = {
        settings,
        setSettings,
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};

export default function useSettings() {
    return useContext(SettingsContext);
}

export function useSettingsMenu() {
    const { openModal } = useModal();

    return {
        openSettings: (page = "general") =>
            openModal(
                () => Settings,
                { page },
                () => {},
                { x: "800px", y: "800px" }
            ),
    };
}
