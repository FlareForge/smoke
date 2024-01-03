import styled from "styled-components";
import Icon from "../Icon";
import { useEffect, useState } from "react";

export default function WindowControls() {
    const [appVersion, setAppVersion] = useState(null);

    useEffect(() => {
        window.app.getVersion().then(setAppVersion);
    });

    return (
        <ControlsContainer>
            <div>smoke v{appVersion || '0'}</div>
            <div>
                <div
                    onClick={() => {
                        window.app.fullscreen();
                    }}
                >
                    <Icon name="monitor" />
                </div>
                <div
                    onClick={() => {
                        window.app.minimize();
                    }}
                >
                    <Icon name="minus" />
                </div>
                <div
                    onClick={() => {
                        window.app.maximize();
                    }}
                >
                    <Icon name="maximize" />
                </div>
                <div
                    onClick={() => {
                        window.app.close();
                    }}
                >
                    <Icon name="close" />
                </div>
            </div>
        </ControlsContainer>
    );
}

export function FullscreenControls() {

    return (
        <FullscreenControlsContainer
            onClick={() => {
                window.app.fullscreen();
            }}
        >
            <Icon name="minimize" />
        </FullscreenControlsContainer>
    );
}

const FullscreenControlsContainer = styled.div`
    transition-duration: revert;
    height: var(--window-handle);
    width: var(--window-handle);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    cursor: pointer;
    padding: calc(var(--unit) * 4);
    box-sizing: border-box;
    top: 0;
    right: 0;
    z-index: 10000;
    border-radius: 0 0 0 var(--mini-radius);
    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

const ControlsContainer = styled.div`
    transition-duration: revert;
    height: var(--window-handle);
    display: flex;
    background-color: rgba(255, 255, 255, 0.05);
    background-color: rgba(255, 255, 255, 0.05);
    border: var(--border-size) solid rgba(255, 255, 255, 0.1);
    position: relative;
    z-index: 10000;

    &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: var(--unit)
    }

    & > div:first-child {
        -webkit-app-region: drag;
        flex: 1 0 0;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 6px;
        font-weight: 600;
        font-size: 12px;
    }

    & > div:last-child {
        display: flex;

        & > div {
            width: var(--window-handle);
            height: var(--window-handle);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4px;
            box-sizing: border-box;
            background-color: rgba(255, 255, 255, 0.05);

            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }

            &:last-child:hover {
                background-color: rgba(255, 0, 0, 0.5);
            }
        }
    }
`;