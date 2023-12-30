import { SettingEntry } from "./shared";
import { useState } from "react";
import Loader from "@Components/Loader";

export default function DeviceSettings() {
    const [clearing, setClearing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    return (
        <>
            <SettingEntry>
                <div>Clear all data</div>
                <div
                    className="focusable"
                    onClick={async () => {
                        setClearing(true);
                        await window.app.Services.Storage.clear('all');
                        setClearing(false);
                    }}
                >
                    {clearing ? <Loader size="16px" /> : "Clear"}
                </div>
            </SettingEntry>
            <SettingEntry>
                <div>Clear games data</div>
                <div
                    className="focusable"
                    onClick={async () => {
                        setClearing(true);
                        await window.app.Services.Storage.clear('games');
                        setClearing(false);
                    }}
                >
                    {clearing ? <Loader size="16px" /> : "Clear"}
                </div>
            </SettingEntry>
            <SettingEntry>
                <div>Delete all emulators</div>
                <div
                    className="focusable"
                    onClick={() => {
                        setDeleting(true);
                        window.app.Services.Emulator.getEmulators().then(
                            (emulators) => {
                                Promise.all(
                                    emulators.map(async (emulator) => {
                                        await window.app.Services.Emulator.uninstall(
                                            emulator.id
                                        );
                                    })
                                ).then(() => {
                                    setDeleting(false);
                                });
                            }
                        );
                    }}
                >
                    {deleting ? <Loader size="16px" /> : "Delete"}
                </div>
            </SettingEntry>
        </>
    );
}