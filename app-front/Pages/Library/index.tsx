import { useState, useEffect } from "react"
import styled from "styled-components";
import { useModal } from "../../Components/Modal";
import Input from "../../Components/Input";
import useTransition from "../../Components/Transition";
import useSettings from "../../Components/Settings";
import Loader from "../../Components/Loader";
import Icon from "../../Components/Icon";
import Thumb from "./thumb";

const CheckName = ({ name, closeModal }) => {
    const [_name, setName] = useState(name);

    return (
        <div>
            <h1>Game Name</h1>
            <h2>Is this the correct name?</h2>
            <div>
                <Input type="text" value={_name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <button
                    onClick={() => {
                        closeModal(_name);
                    }}
                >Confirm</button>
            </div>
        </div>
    )
}

const CheckEmulator = ({ closeModal }) => {
    const select = async (emulator) => {
        const emulatorPath = await window.app.Services.Emulator.getEmulatorPath(emulator);
        closeModal({
            id: emulator,
            path: emulatorPath
        });
    }

    const [emulators, setEmulators] = useState([]);
    const [loadings, setLoadings] = useState({});
    const [isLocked, setIsLocked] = useState(false);

    useEffect(() => {
        updateEmulators();
    }, []);
    
    const updateEmulators = () => {
        window.app.Services.Emulator.getEmulators().then(setEmulators);
    }

    return (
        <div>
            <h1>Emulator</h1>
            <h2>Which emulator should this game use?</h2>
            <div>
                <EmulatorList
                    $locked={isLocked}
                >
                    {emulators.map((emulator, i) => 
                        <div
                            onClick={async () => {
                                if(emulator.installed){
                                    select(emulator.id);
                                }else {
                                    setIsLocked(true);
                                    setLoadings({...loadings, [emulator.id]: true});
                                    await window.app.Services.Emulator.install(emulator.id)
                                    setLoadings({...loadings, [emulator.id]: false});
                                    select(emulator.id);
                                }
                            }}
                            key={i}
                        >
                            <img src={emulator.icon || "./platforms/nds.svg"} alt="icon"/>
                            <div>{emulator.platform?.toUpperCase()}</div>
                            <div></div>
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.app.open(emulator.link);
                                }}
                            >{emulator.name?.toLowerCase()}</div>
                            {emulator.installed ?
                                <InstallBtn
                                    $installed={true}
                                >Installed</InstallBtn> :
                            loadings[emulator.id] ?
                                <InstallBtn $installed={true}><Loader size="16px" /></InstallBtn> :
                                <InstallBtn
                                    onClick={async (e) => {
                                        e.stopPropagation();
                                        setLoadings({...loadings, [emulator.id]: true});
                                        await window.app.Services.Emulator.install(emulator.id);
                                        setLoadings({...loadings, [emulator.id]: false});
                                        updateEmulators();
                                    }}
                                >Install</InstallBtn>
                            }
                        </div>
                    )}
                </EmulatorList>
            </div>
            <div>
                <button onClick={() => closeModal()}>Cancel</button>
            </div>
        </div>
    )
}

const SelectMethod = ({ closeModal }) => {
    
    return (
        <div>
                <EmulatorList
                    style={{marginBottom: '40px'}}
                >
                    <AddOption
                        onClick={() => closeModal("select")}
                    >
                        <Icon name={"file-plus"}/>
                        <div>
                            <div>Add a single game</div>
                            <div>Drag & drop a rom or select a game to add it to your library</div>
                        </div>
                    </AddOption>
                    <AddOption
                        onClick={() => closeModal("scan")}
                    >
                        <Icon name={"folder-plus"}/>
                        <div>
                            <div>Scan a folder</div>
                            <div>Select a folder to scan for compatible roms</div>
                        </div>
                    </AddOption>
                    <AddOption
                        className="soon"
                        onClick={() => closeModal("scan")}
                    >
                        <Icon name={"archive"}/>
                        <div>
                            <div>Scan a zip file</div>
                            <div>Select a zip file to be extracted and scanned for compatible roms</div>
                        </div>
                    </AddOption>
                    <AddOption
                        className="soon"
                        onClick={() => closeModal("store")}
                    >
                        <Icon name={"shopping"}/>
                        <div>
                            <div>Open the store</div>
                            <div>Browse the store for new games</div>
                        </div>
                    </AddOption>
                </EmulatorList>
            <div>
                <button onClick={() => closeModal()}>Cancel</button>
            </div>
        </div>
    )
}

const AddOption = styled.div`
    display: flex;
    align-items: center;
    gap: 20px !important;
    padding: 20px 10px !important;

    & > div:first-child{
        margin-left: 10px;
        width: 50px;
        height: 50px;
    }

    & > div:last-child{
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 5px;

        & > div:last-child{
            font-size: 15px;
            font-weight: 400;
        }
    }
`;

const InstallBtn = styled.div`
    padding: 5px 10px;
    text-align: center;
    width: 90px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.15);
    cursor: pointer;
    pointer-events: ${(props: any) => props.$installed ? 'none' : 'all'};
    opacity: ${(props: any) => props.$installed ? '0.5' : '1'};
`;

const EmulatorList = styled.div`
    pointer-events: ${(props: any) => props.$locked ? 'none' : 'all'};
    opacity: ${(props: any) => props.$locked ? '0.5' : '1'};
    display: flex;
    flex-direction: column;
    gap: 0;
    height: 100%;
    border-radius: 18px;
    overflow: hidden;
    background-color: var(--grey);
    overflow-y: overlay;
    overflow-x: hidden;
    height: 400px;
    padding: 0 !important;
    box-sizing: border-box;

    & > div{
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

        &:hover{
            background-color: rgba(255, 255, 255, 0.2);
        }
        
        &:nth-child(odd){
            background-color: rgba(255, 255, 255, 0.05);
        }

        &:nth-child(odd):hover{
            background-color: rgba(255, 255, 255, 0.15);
        }

        & > img{
            width: 20px;
            height: 20px;
            margin-left: 6px;
        }

        & > div:nth-child(3){
            flex: 1 0 0;
        }

        & > div:nth-child(4){
            font-size: 18px;
            font-weight: 500;
            text-align: right;
            opacity: 0.5;
            cursor: pointer;
            border-radius: 8px;
            padding: 5px 10px;

            &:hover{
                background-color: rgba(255, 255, 255, 0.2);
            }
        }
    }
`;


export default function Library({ changeAction }){
    const { openModal } = useModal();
    const { settings } = useSettings();
 
    const navigate = useTransition();

    const [Games, setGames] = useState([]);

    const updateGames = () => {
        window.app.Services.Storage.getGames().then((games: any) => {
            setGames(Object.values(games))
        });
    }

    const checkName = (name) => {
        return new Promise((resolve, _) => {
            openModal(() => CheckName, {name}, resolve);
        });
    }

    const checkEmulator = (): Promise<{id: string, path: string}> => {
        return new Promise((resolve, _) => {
            openModal(() => CheckEmulator, {}, resolve, {x: '500px', y: '400px'});
        });
    }

    const selectMethod = () => {
        return new Promise((resolve, _) => {
            openModal(() => SelectMethod, {}, resolve, {x: '500px', y: '600px'});
        });
    }

    const addGame = async () => {
        const method = await selectMethod();
        if(!method) return;
        switch(method){
            case "select":
                const game = await window.app.Services.Scanner.selectGame()
                if(!game) return;
                if(!game.emulator){
                    const emulator = await checkEmulator()
                    if(!emulator) return;
                    game.emulator = emulator.id;
                    game.emulatorPath = emulator.path;
                }
                const name = await checkName(game.name)
                game.name = name as string;
                const scrapedGame = await window.app.Services.Metadata.scrapGame(game)
                await window.app.Services.Storage.addGame(scrapedGame)
                updateGames();
                break;
            case "scan":
                window.app.Services.Emulator.scanFolder(async ({name, path, emulator}) => {
                    const emulatorPath = await window.app.Services.Emulator.getEmulatorPath(emulator);
                    const scrapedGame = await window.app.Services.Metadata.scrapGame({
                        name,
                        path,
                        emulator,
                        emulatorPath,
                    })
                    await window.app.Services.Storage.addGame(scrapedGame)
                    updateGames();
                });
                break;
            case "store":
                navigate('/');
                break;
        }
    }

    useEffect(() => {
        updateGames();
        const interval = setInterval(() => {
            if(document.hidden) return;
            updateGames();
        }, 2000)
        changeAction("plus", () => {addGame()})
        return () => {
            changeAction(null, null);
            clearInterval(interval);
        }
    }, []);

    return (
        <div>
            { !Games.length ? 
                <Message>
                    No game found!&nbsp;
                    <u onClick={addGame}>Scan</u>
                    &nbsp;a rom folder or manually&nbsp;
                    <u onClick={addGame}>Add</u>
                    &nbsp;any game.
                </Message> :
                <Grid
                    $coverSize={settings.coverSize}
                >
                    {Games.map((game: any) => {
                        return (
                            <Thumb
                                key={game.id}
                                orientation={settings.orientation}
                                game={game}
                                onClick={() => {
                                    navigate(`/game/${game.id || 0}`)
                                }}
                            >
                            </Thumb>
                        )
                    })}
                </Grid>
            }
        </div>
    )
}

const Message = styled.div`
    margin-top: 35px;
    font-size: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    & > u{
        cursor: pointer;
        padding: 5px 10px;
        border-radius: 8px;
        background-color: rgba(255, 255, 255, 0.15);
        text-decoration: none;
    }
`;

const Grid = styled.div`
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(${(props: any) => props.$coverSize || '300'}px, 1fr));
    gap: 20px;
`;