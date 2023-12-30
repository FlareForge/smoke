import "./index.css";
import { StrictMode, useState, useEffect} from "react";
import * as ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { createGlobalStyle, styled } from 'styled-components';
import { ModalProvider } from "@Components/Modal";
import useSettings, { SettingsProvider } from "@Components/Settings";
import WindowControls from "@Components/WindowControls";
import { FullscreenControls } from "@Components/WindowControls";
import Header from "@Components/Header";
import FriendsBar from "@Components/FriendsBar";

import Library from "@Pages/Library";
import Game from "@Pages/Game";
import Profile from "@Pages/Profile";
import Settings from "@Pages/Settings";

ReactDOM.createRoot(document.getElementById("root")).render(
    <StrictMode>
        <SettingsProvider>
            <ModalProvider>
                <App />
            </ModalProvider>
        </SettingsProvider>
    </StrictMode>
);

function App() {
    const { settings } = useSettings();

    const [fullscreen, setFullscreen] = useState(false);
    const [icon, setIcon] = useState(null);
    const [action, setAction] = useState(null);

    useEffect(() => {
        window.addEventListener('fullscreen', handleFullScreen);
        return () => {
            window.removeEventListener('fullscreen', handleFullScreen);
        };
    }, []);

    const handleFullScreen = (event) => setFullscreen(!!event.detail.fullscreen);

    const changeMainAction = (icon, action) => {
        setIcon(icon);
        setAction(() => action);
    };

    return (
        <AppContainer>
            <Style settings={settings}/>
            <HashRouter>
                {!fullscreen && <WindowControls/>}
                <Split
                    $fullscreen={fullscreen}
                >
                    <SplitContent>
                        {fullscreen && <FullscreenControls />}
                        <Header
                            fullscreen={fullscreen}
                            icon={icon}
                            action={action}
                        />
                        <PageContainer>
                            <Routes>
                                <Route path="/" element={<>Home</>} />
                                <Route path="/market" element={<>Store</>} />
                                <Route path="/library" element={<Library changeAction={changeMainAction} />} />
                                <Route path="/social" element={<>Social</>} />
                                <Route path="/game/:id" element={<Game />} />
                                <Route path="/profile/:id" element={<Profile />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/settings/:section/:param?" element={<Settings />} />
                            </Routes>
                        </PageContainer>
                    </SplitContent>
                    <FriendsBar />
                </Split>
            </HashRouter>
        </AppContainer>
    );
}

const Split = styled.div`
    width: 100%;
    height: ${(props: any) => props.$fullscreen ? "100vh" : "calc(100vh - var(--window-handle) - var(--unit) * 3)"};
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    border-right: ${(props: any) => props.$fullscreen ? "none" : "var(--border-size) solid rgba(255, 255, 255, 0.1)"};
    border-left: ${(props: any) => props.$fullscreen ? "none" : "var(--border-size) solid rgba(255, 255, 255, 0.1)"};
    border-bottom: ${(props: any) => props.$fullscreen ? "none" : "var(--border-size) solid rgba(255, 255, 255, 0.1)"};
`;

const SplitContent = styled.div`
    flex: 1 0 0;
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 1px;
`;

const AppContainer = styled.div`
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    background: var(--dark);
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const PageContainer = styled.div`
    box-sizing: border-box;
    padding: 0 var(--padding) var(--padding) var(--padding);
    padding-top: calc(var(--nav-height) + var(--padding) / 2);
    overflow-y: scroll;
    overflow-x: hidden;
    flex: 1 0 0;
`;

const Style = createGlobalStyle`
    :root {
        --main: ${(props: any) => props.settings.mainColor};
        --dark: ${(props: any) => props.settings.darkColor};
        --grey: ${(props: any) => props.settings.lightColor};
        --green: ${(props: any) => props.settings.highlightColor};
        --scale: 1;
    }

    * {
        ${(props: any) => props.settings.enableBlur ? "" : "backdrop-filter: none !important;"}
        ${(props: any) => props.settings.enableAnimations ? "" : "transition-duration: revert !important;"}
    }
`;