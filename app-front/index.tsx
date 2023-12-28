import "./index.css";
import { StrictMode, useState, useEffect} from "react";
import * as ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { createGlobalStyle, styled } from 'styled-components';
import { ModalProvider } from "@Components/Modal";
import useSettings, { SettingsProvider } from "@Components/Settings";
import WindowControls from "@Components/WindowControls";
import Header from "@Components/Header";

import Library from "@Pages/Library";
import Game from "@Pages/Game";
import Profile from "@Pages/Profile";

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
                <WindowControls fullscreen={fullscreen} />
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
                    </Routes>
                </PageContainer>
            </HashRouter>
        </AppContainer>
    );
}

const AppContainer = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: var(--dark);
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const PageContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 0 50px;
    padding-top: 85px;
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
        --padding: 50px;
    }

    * {
        ${(props: any) => props.settings.enableBlur ? "" : "backdrop-filter: none !important;"}
        ${(props: any) => props.settings.enableAnimations ? "" : "transition-duration: revert !important;"}
    }
`;