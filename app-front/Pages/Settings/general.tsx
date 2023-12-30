import useSettings from "@Components/Settings";
import { SettingEntry } from "./shared";

export default function GeneralSettings() {
    const { settings, setSettings } = useSettings();

    return (
        <>
            <SettingEntry>
                <div>Start on boot</div>
                <input
                    type="checkbox"
                    name="body"
                    className="focusable"
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