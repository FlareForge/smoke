import styled from "styled-components";
import Icon from "../Icon";

export default function WindowControls({fullscreen = false}) {

    if(fullscreen) return (
        <FullscreenControls
            onClick={() => {
                window.app.fullscreen();
            }}
        >
            <Icon name="minimize" />
        </FullscreenControls>
    );

    return (
        <ControlsContainer>
            <div>smoke</div>
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
                        console.log(window.app);
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

const FullscreenControls = styled.div`
    transition-duration: revert;
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    cursor: pointer;
    padding: 6px;
    box-sizing: border-box;
    top: 0;
    right: 0;
    z-index: 10000;
    border-radius: 0 0 0 8px;
    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

const ControlsContainer = styled.div`
    transition-duration: revert;
    width: calc(100% + 0px);
    height: 30px;
    display: flex;
    background-color: rgba(255, 255, 255, 0.05);
    background-color: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    position: relative;
    z-index: 10000;

    &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 1px;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.00) 100%);
        background: linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.00) 100%);
    }

    & > div:first-child {
        -webkit-app-region: drag;
        flex: 1 0 0;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 10px;
        font-weight: 600;
    }

    & > div:last-child {
        display: flex;

        & > div {
            width: 30px;
            height: 30px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 6px;
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