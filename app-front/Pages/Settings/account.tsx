import { SettingEntry } from "./shared";
import { useState, useEffect } from "react";

export default function AccountSettings() {
    const [userData, _setUserData] = useState({
        username: "",
        avatar: "",
    });
    const [timer, setTimer] = useState(null);
    const [nonce, setNonce] = useState(0);

    const updateUserData = () => {
        window.app.Services.Account.getUserData("token", {}).then(_setUserData);
    }

    const pushNewUserData = (_userData) => window.app.Services.Account.setUserData("token", _userData);

    const setUserData = (newUserData) => {
        const _userData = {
            ...userData,
            ...newUserData,
        };
        _setUserData(_userData);
        clearTimeout(timer);
        setTimer(setTimeout(() => pushNewUserData(_userData), 1000));
    }

    const pickFile = async () => {
        var input = document.createElement('input');
        input.type = 'file';
        input.style.display = 'none';
        document.body.appendChild(input);
        input.onchange = async () => {
            if (input.files.length > 0) {
                const file = input.files[0];
                const base64 = await resizeAndConvertImage(file);
                const result = await window.app.Services.Account.changeAvatar("token", {base64});
                if(result) updateUserData();
                setNonce(prev => prev + 1);
            }
            document.body.removeChild(input);
        };
        input.oncancel = () => document.body.removeChild(input);
        input.click();
    };

    const resizeAndConvertImage = (file) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = 512;
                canvas.height = 512;
                ctx.drawImage(img, 0, 0, 512, 512);
                canvas.toBlob((blob) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = () => {
                        resolve(reader.result);
                    };
                }, 'image/jpeg');
            };
            img.onerror = (error) => reject(error);
        });
    };

    useEffect(updateUserData, []);
    
    return (
        <>
            <SettingEntry>
                <div>Username</div>
                <input
                    type="text"
                    name="body"
                    className="focusable"
                    value={userData.username || ""}
                    onChange={(e) => setUserData({ username: e.target.value })}
                />
            </SettingEntry>
            <SettingEntry
                style={{height: "100px"}}
            >
                <div>Avatar</div>
                <div
                    onClick={pickFile}
                    className="focusable image"
                    style={userData.avatar ? {
                        backgroundImage: `url(${userData.avatar}?nonce=${nonce})`,
                    } : {}}
                >
                </div>
            </SettingEntry>
            <SettingEntry>
                <div> </div>
                <div
                    className="focusable"
                    onClick={async () => {
                        window.app.Services.Account.logout("token")
                        _setUserData({
                            username: "",
                            avatar: "",
                        });
                    }}
                >
                    Logout
                </div>
            </SettingEntry>
        </>
    );
}