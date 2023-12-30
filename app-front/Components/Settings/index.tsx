import { useState, createContext, useContext, useEffect } from "react";

const defaultSettings = {
    mainColor: "#fa8414",
    darkColor: "#010B0E",
    lightColor: "#01141A",
    highlightColor: "#05ff00",
    enableAnimations: true,
    enableBlur: true,
    coverSize: 300,
    orientation: "portrait",
    startOnBoot: false,
};

const SettingsContext = createContext<any>({
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