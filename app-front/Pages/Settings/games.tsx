import Button from "@Components/Button";
import { EmulatorList, MappingSettings, SchemaSettings, SettingEntry } from "./shared";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function GamesSettings() {
    const { param: game } = useParams();

    const [emulators, setEmulators] = useState([]);
    const [emulatorConfig, setEmulatorConfig] = useState(null);
    const [games, setGames] = useState(null);
    const [openedGame, setOpenedGame] = useState(null);

    useEffect(() => {
        if(game) setOpenedGame(game);
        updateData()
    }, []);

    useEffect(() => {updateEmulatorConfig()}, [openedGame]);

    const updateData = () => {
        window.app.Services.Storage.getGames().then(setGames);
        window.app.Services.Emulator.getEmulators().then(setEmulators);
    }

    const updateEmulatorConfig = () => {
        if(!openedGame || openedGame === 'add') return;
        const game = games[openedGame]
        window.app.Services.Emulator.getConfiguration(game.emulator).then(setEmulatorConfig);
    }
    
    if(openedGame && openedGame !== 'add') {
        const game = games[openedGame] 

        return <>
            <SettingEntry>
                <div></div>
                <Button
                    className="focusable"
                    onClick={() => setOpenedGame(null)}
                    style={{width: '135px'}}
                >
                    Return
                </Button>
                <Button
                    className="focusable"
                    onClick={async () => {
                        await window.app.Services.Storage.removeGame(openedGame);
                        setOpenedGame(null);
                        updateData();
                    }}
                >
                    Remove
                </Button>
            </SettingEntry>
            <h2>{game.name}</h2>
            {game.emulator !== "native" && <SettingEntry>
                <div>Emulator</div>
                <select
                    value={game.emulator}
                    className="focusable"
                    onChange={async (e) => {
                        setGames({
                            ...games,
                            [openedGame]: {
                                ...game,
                                emulator: e.target.value,
                            }
                        });
                        await window.app.Services.Storage.setGame({...game, emulator: e.target.value})
                        updateData();
                    }}
                >
                    {emulators.map((emulator, i) => (
                        <option className="focusable" key={i} value={emulator.id}>{emulator.name}</option>
                    ))}
                </select>
            </SettingEntry>}
            <SettingEntry>
                <div>Title</div>
                <input
                    type="text"
                    name="body"
                    value={game.name}
                    className="focusable"
                    onChange={(e) => {
                        setGames({
                            ...games,
                            [openedGame]: {
                                ...game,
                                name: e.target.value,
                            }
                        });
                        window.app.Services.Storage.setGame({...game, name: e.target.value})
                    }}
                />
            </SettingEntry>
            <SettingEntry>
                <div>Description</div>
                <input
                    type="text"
                    name="body"
                    value={game.description}
                    className="focusable"
                    onChange={(e) => {
                        setGames({
                            ...games,
                            [openedGame]: {
                                ...game,
                                description: e.target.value,
                            }
                        });
                        window.app.Services.Storage.setGame({...game, description: e.target.value})
                    }}
                />
            </SettingEntry>
            <SettingEntry>
                <div>Image</div>
                <input
                    type="text"
                    name="body"
                    value={game.image}
                    className="focusable"
                    onChange={(e) => {
                        setGames({
                            ...games,
                            [openedGame]: {
                                ...game,
                                image: e.target.value,
                            }
                        });
                        window.app.Services.Storage.setGame({...game, image: e.target.value})
                    }}
                />
            </SettingEntry>
            <SettingEntry>
                <div>Banner</div>
                <input
                    type="text"
                    name="body"
                    value={game.banner}
                    className="focusable"
                    onChange={(e) => {
                        setGames({
                            ...games,
                            [openedGame]: {
                                ...game,
                                banner: e.target.value,
                            }
                        });
                        window.app.Services.Storage.setGame({...game, banner: e.target.value})
                    }}
                />
            </SettingEntry>
            <SettingEntry>
                <div>Path</div>
                <input
                    type="text"
                    name="body"
                    value={game.path}
                    className="focusable"
                    onChange={(e) => {
                        setGames({
                            ...games,
                            [openedGame]: {
                                ...game,
                                path: e.target.value,
                            }
                        });
                        window.app.Services.Storage.setGame({...game, path: e.target.value})
                    }}
                />
            </SettingEntry>
            <SettingEntry
                style={{marginTop: "calc(var(--quintet) * 2.5) "}}
            >
                <div>Emulator settings</div>
                <Button
                    className="focusable"
                    onClick={() => {
                        updateEmulatorConfig();
                        setGames({
                            ...games,
                            [openedGame]: {
                                ...game,
                                emulatorConfig: {},
                            }
                        });
                        window.app.Services.Storage.setGame({...game, emulatorConfig: {}})
                    }}
                >
                    Reset
                </Button>
            </SettingEntry>
            {emulatorConfig && <SchemaSettings
                schema={emulatorConfig?.schema || {}}
                data={{
                    ...emulatorConfig?.data || {},
                    ...game.emulatorConfig || {}
                }}
                setData={(config) => {
                    const _config = {
                        ...game.emulatorConfig || {},
                        ...config,
                    }
                    setGames({
                        ...games,
                        [openedGame]: {
                            ...game,
                            emulatorConfig: _config,
                        }
                    });
                    window.app.Services.Storage.setGame({...game, emulatorConfig: _config})
                }}
            />}
            {emulatorConfig && <MappingSettings
                data={{
                    ...emulatorConfig?.data?.mapping || {},
                    ...game.mapping || {},
                }}
                setData={(mapping) => {
                    const data = {
                        ...game,
                        mapping: {
                            ...game.mapping || {},
                            ...mapping,
                        },
                    }
                    setGames({
                        ...games,
                        [openedGame]: data
                    });
                    window.app.Services.Storage.setGame({...data})
                }}    
            />}
        </>
    }

    return (
        <EmulatorList>
            {Object.values(games || {}).map((game: any, i) => (
                <div
                    className="focusable"
                    key={i}
                    onClick={() => setOpenedGame(game.id)}
                >
                    <img
                        src={game.image || "./platforms/nds.svg"}
                        alt={game.name}
                    />
                    <div>{game.name}</div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            ))}
        </EmulatorList>
    );
}