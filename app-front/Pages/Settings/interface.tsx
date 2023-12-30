import useSettings from "@Components/Settings";
import { SettingEntry } from "./shared";

export default function InterfaceSettings() {
    const { settings, setSettings } = useSettings();

    return (
        <>
            <SettingEntry>
                <div>Main Color</div>
                <input
                    className="focusable"
                    type="color"
                    name="body"
                    value={settings.mainColor}
                    onChange={(e) => setSettings({ mainColor: e.target.value })}
                />
            </SettingEntry>
            <SettingEntry>
                <div>Dark Color</div>
                <input
                    className="focusable"
                    type="color"
                    name="body"
                    value={settings.darkColor}
                    onChange={(e) => setSettings({ darkColor: e.target.value })}
                />
            </SettingEntry>
            <SettingEntry>
                <div>Light Color</div>
                <input
                    className="focusable"
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
                    className="focusable"
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
                    className="focusable"
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