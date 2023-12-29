import { EmulatorList, MappingSettings, SchemaSettings, SettingEntry } from "./shared";
import { useState, useEffect } from "react";
import Loader from "@Components/Loader";
import Icon from "@Components/Icon";
import styled from "styled-components";

export default function EmulatorsSettings() {
    const [emulators, setEmulators] = useState([]);
    const [loadings, setLoadings] = useState({});
    const [openedEmulator, setOpenedEmulator] = useState(null);
    const [emulatorData, setEmulatorData] = useState(null);
    const [lastTimeout, setLastTimeout] = useState(null);
    const [newEmulatorData, setNewEmulatorData] = useState({
        name: "",
        platform: "",
        icon: "",
        path: "",
        ext: "",
        args: [
            "{path}"
        ],
    });

    useEffect(() => {updateEmulators()}, []);

    useEffect(() => {
        if(openedEmulator && openedEmulator !== 'add') window.app.Services.Emulator.getConfiguration(openedEmulator).then(setEmulatorData);
        if(!openedEmulator) updateEmulators();
    }, [openedEmulator]);

    const updateEmulators = () => {
        window.app.Services.Emulator.getEmulators().then(setEmulators);
    };
    
    if(openedEmulator && openedEmulator === 'add') {

        return (
            <>
                <SettingEntry>
                    <div>Add emulator</div>
                    <Button
                        className="focusable"
                        onClick={() => setOpenedEmulator(null)}
                        style={{width: '135px'}}
                    >
                        Return
                    </Button>
                    <Button
                        className="focusable"
                        onClick={async () => {
                            await window.app.Services.Emulator.addCustomEmulator({
                                ...newEmulatorData,
                                link: "",
                                installed: true,
                            });
                            setOpenedEmulator(null);
                            updateEmulators();
                        }}
                    >
                        Add
                    </Button>
                </SettingEntry>
                <SettingEntry>
                    <div>Name</div>
                    <input
                        className="focusable"
                        type="text"
                        name="body"
                        placeholder="emulator"
                        value={newEmulatorData.name}
                        onChange={(e) => setNewEmulatorData({ ...newEmulatorData, name: e.target.value })}
                    />
                </SettingEntry>
                <SettingEntry>
                    <div>Platform</div>
                    <input
                        className="focusable"
                        type="text"
                        name="body"
                        placeholder="PLATFORM"
                        value={newEmulatorData.platform}
                        onChange={(e) => setNewEmulatorData({ ...newEmulatorData, platform: e.target.value })}
                    />
                </SettingEntry>
                <SettingEntry>
                    <div>Extension</div>
                    <input
                        className="focusable"
                        type="text"
                        name="body"
                        placeholder=".gba"
                        value={newEmulatorData.ext}
                        onChange={(e) => setNewEmulatorData({ ...newEmulatorData, ext: e.target.value })}
                    />
                </SettingEntry>
                <SettingEntry>
                    <div>Path</div>
                    <input
                        className="focusable"
                        type="text"
                        name="body"
                        placeholder={"C:\\...\\emulator.exe"}
                        value={newEmulatorData.path}
                        onChange={(e) => setNewEmulatorData({ ...newEmulatorData, path: e.target.value })}
                    />
                </SettingEntry>
                <SettingEntry>
                    <div>Command Arguments</div>
                    <div
                        className="focusable"
                        onClick={() => {
                            const _args = [...newEmulatorData.args];
                            _args.push("");
                            setNewEmulatorData({ ...newEmulatorData, args: _args });
                        }}
                    >
                        Add
                    </div>
                </SettingEntry>
                {newEmulatorData.args.map((arg, i) => (
                    <SettingEntry
                        key={i}
                    >
                        <div>Argument {i}</div>
                        <input
                            className="focusable"
                            type="text"
                            name="body"
                            value={arg}
                            style={{width: '300px'}}
                            onChange={(e) => {
                                const _args = [...newEmulatorData.args];
                                _args[i] = e.target.value;
                                setNewEmulatorData({ ...newEmulatorData, args: _args });
                            }}
                        />
                        <div
                            className="focusable"
                            style={{ width: "40px", padding: "calc(var(--decade) * 0.6) " }}
                            onClick={() => {
                                const _args = [...newEmulatorData.args];
                                _args.splice(i, 1);
                                setNewEmulatorData({ ...newEmulatorData, args: _args });
                            }}
                        >
                            <Icon name="close" />
                        </div>
                    </SettingEntry>
                ))}
                <SettingEntry>
                    <div>Icon</div>
                    <input
                        className="focusable"
                        type="text"
                        name="body"
                        placeholder="https://..."
                        value={newEmulatorData.icon}
                        onChange={(e) => setNewEmulatorData({ ...newEmulatorData, icon: e.target.value })}
                    />
                </SettingEntry>
            </>
        );
    } else if (openedEmulator) {
        const emulator = emulators.find((e) => e.id === openedEmulator);
        const platform = emulator.platform;
        const name = emulator.name;

        const schema = emulatorData?.schema || {};
        const data = emulatorData?.data || {};


        const setEmulatorConfig = (config) => {
            setEmulatorData({
                ...emulatorData,
                data: {
                    ...data,
                    ...config,
                }
            });
            if(lastTimeout) clearTimeout(lastTimeout);
            let timeout = setTimeout(() => {
                window.app.Services.Emulator.setConfiguration(openedEmulator, {
                    ...data,
                    ...config,
                });
            }, 200);
            setLastTimeout(timeout);
        }

        return (
            <>
                <SettingEntry>
                    <div
                        onClick={() => { emulator.link && window.app.open(emulator.link) }}
                    >{platform.toUpperCase()} - {name.toLowerCase()}</div>
                    <Button
                        className="focusable"
                        onClick={() => setOpenedEmulator(null)}
                        style={{width: '135px'}}
                    >
                        Return
                    </Button>
                    <Button
                        className="focusable"
                        onClick={async () => {
                            await window.app.Services.Emulator.uninstall(emulator.id);
                            setOpenedEmulator(null);
                            updateEmulators();
                        }}
                    >
                        {emulator.custom ? "Remove" : "Uninstall"}
                    </Button>
                </SettingEntry>
                <SchemaSettings
                    schema={schema}
                    data={data}
                    setData={setEmulatorConfig}
                />
                <MappingSettings
                    data={data?.mapping || {}}
                    setData={(mapping) => {
                        setEmulatorConfig({
                            mapping: {
                                ...data?.mapping || {},
                                ...mapping,
                            }
                        });
                    }}
                />
            </>
        );
    }

    return (
        <EmulatorList>
            {emulators.map((emulator, i) => (
                <div
                    key={i}
                    className="focusable"
                    onClick={() => setOpenedEmulator(emulator.id)}
                >
                    <img
                        src={emulator.icon || "./platforms/nds.svg"}
                        alt={emulator.name}
                    />
                    <div>{emulator.platform?.toUpperCase()}</div>
                    <div></div>
                    <div
                        className="focusable"
                        onClick={(e) => {
                            e.stopPropagation();
                            window.app.open(emulator.link);
                        }}
                    >
                        {emulator.name?.toLowerCase()}
                    </div>
                    {emulator.installed ? (
                        <Button $installed={true}>Installed</Button>
                    ) : loadings[emulator.id] ? (
                        <Button $installed={true}>
                            <Loader size="16px" />
                        </Button>
                    ) : (
                        <Button
                            className="focusable"
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
                        </Button>
                    )}
                </div>
            ))}
            <div
                className="focusable"
                onClick={() => setOpenedEmulator('add')}
            >
                <img
                    src={"./svgs/plus.svg"}
                    alt={"plus"}
                />
                <div>Add emulator</div>
                <div></div>
                <div></div>
            </div>
        </EmulatorList>
    );
}

const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: calc(var(--decade) * 0.6) calc(var(--decade) * 1.2);
    text-align: center;
    width: calc(var(--decade) * 3);
    height: calc(var(--decade) * 1.5);
    border-radius: var(--small-radius);
    background-color: rgba(255, 255, 255, 0.15);
    cursor: pointer;
    pointer-events: ${(props: any) => (props.$installed ? "none" : "all")};
    opacity: ${(props: any) => (props.$installed ? "0.5" : "1")};
`;