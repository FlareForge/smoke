import { StrictMode, useEffect, useState } from "react";
import * as ReactDOM from "react-dom/client";
import styled from "styled-components";
import "./index.css";
import { ModalProvider } from "./Components/Modal/index.tsx";
import useSettings, { SettingsProvider } from "./Components/Settings/index.tsx";
import { createGlobalStyle } from 'styled-components';

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <SettingsProvider>
            <ModalProvider>
                <OverlayApp/>
            </ModalProvider>
        </SettingsProvider>
    </StrictMode>
);

function OverlayApp() {
    const { settings } = useSettings();

    const [overlayData, setOverlayData] = useState<any>({});

    useEffect(() => {
        window.addEventListener("overlay-open", updateData);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("overlay-open", updateData);
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, []);

    const updateData = (event) => setOverlayData(event.detail)
    const handleKeyDown = (e) => e.key === "Escape" && window.app.closeOverlay();

    return (
        <AppContainer>

            <Style settings={settings}/>

            <GameOptions>
                <BackButton
                    onClick={() => {
                        window.app.closeOverlay();
                    }}
                >
                    Back to the game
                </BackButton>
                {
                    overlayData?.game?.id && 
                    <BackButton
                        red={true}
                        onClick={async () => {
                            await window.app.Services.Emulator.shutdownGame(overlayData.game);
                            window.app.closeOverlay();
                        }}
                    >
                        Close Game
                    </BackButton>
                }
            </GameOptions>

            <LayoutGuide>
                {
                    overlayData?.layout &&
                    <img
                        src={overlayData.layout}
                        alt="Layout Guide"
                    />
                }
            </LayoutGuide>

        </AppContainer>
    );
}

const GameOptions = styled.div`
    padding: calc(var(--decade) * 1.4);
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    display: flex;
    gap: calc(var(--decade) * 1.4);
    flex-direction: column;
    justify-content: start;
    align-items: start;
`;

const BackButton = styled.button`
    height: calc(var(--quintet) * 0.6);
    border-radius: calc(var(--decade) * 1.4);
    padding: var(--decade) calc(var(--decade) * 1.4);
    border: none;
    background: ${(props: any) => props.red ? "rgba(255, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)"};
    color: white;
    font-size: calc(var(--decade) * 3);
    font-weight: 500;
    cursor: pointer;

    &:hover {
        background: ${(props: any) => props.red ? "rgba(255, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.3)"};
    }
`;

const LayoutGuide = styled.div`
    flex: 1 0 0;
    height: 30vh;
    padding-top: var(--padding);
    display: flex;
    justify-content: end;
    align-items: center;
    pointer-events: none;

    & > img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

const Style = createGlobalStyle`
    :root {
        --main: ${(props: any) => props.settings.mainColor};
        --dark: ${(props: any) => props.settings.darkColor};
        --grey: ${(props: any) => props.settings.lightColor};
        --green: ${(props: any) => props.settings.highlightColor};
        --overlay-background: color-mix(in srgb, var(--grey), transparent 10%);
        --scale: 1;
    }

    * {
        ${props => props.settings.enableBlur ? "" : "backdrop-filter: none !important;"}
        ${props => props.settings.enableAnimations ? "" : "transition-duration: revert !important;"}
    }

    body {
        background: var(--overlay-background);
    }
`;

const AppContainer = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
`;