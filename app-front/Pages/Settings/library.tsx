import useSettings from "@Components/Settings";
import { SettingEntry } from "./shared";

export default function LibrarySettings() {
    const { settings, setSettings } = useSettings();

    return (
        <>
            <SettingEntry>
                <div>Images Target Size</div>
                <input
                    className="focusable"
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
                    className="focusable"
                    value={settings.orientation}
                    onChange={(e) =>
                        setSettings({ orientation: e.target.value })
                    }
                >
                    <option className="focusable" value="portrait">Portrait</option>
                    <option className="focusable" value="landscape">Landscape</option>
                    <option className="focusable" value="square">Square</option>
                </select>
            </SettingEntry>
        </>
    );
}