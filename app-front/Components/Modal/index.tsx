import { createContext, useContext, useState } from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";
import { SettingsProvider } from "../Settings";

const ModalContext = createContext(null);

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};

const ModalProvider = ({ children }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [ContentState, setContent] = useState(<></>);
    const [givenProps, setGivenProps] = useState({});
    const [callbackState, setCallbackState] = useState(null);
    const [size, setSize] = useState(null);

    const openModal = (Content, props, callback, _size) => {
        setContent(Content);
        setIsModalVisible(true);
        setGivenProps(props);
        setCallbackState(() => callback);
        setSize(_size);
    };

    const closeModal = (...args) => {
        if (callbackState) {
            callbackState(...args);
        }
        setIsModalVisible(false);
    };

    const value = {
        isModalVisible,
        openModal,
        closeModal,
    };

    return (
        <SettingsProvider>
            <ModalContext.Provider value={value}>
                {children}
                {isModalVisible &&
                    ReactDOM.createPortal(
                        <>
                            <Modal
                                givenProps={givenProps}
                                Content={ContentState}
                                onClose={closeModal}
                                size={size}
                            />
                        </>,
                        document.getElementById("modal-root")
                    )}
            </ModalContext.Provider>
        </SettingsProvider>
    );
};

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
    z-index: 1000;
    & ._before {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: #253445;
        opacity: 0.8;
        z-index: -1;
        cursor: pointer;
    }
`;

const ModalContainer = styled.div`
    background: var(--dark);
    border-radius: 28px;
    box-shadow: 0 0 calc(var(--decade) * 0.6)  rgba(0, 0, 0, 0.2);
    position: relative;
    width: ${(props: any) => props.$size.x};
    min-height: ${(props: any) => props.$size.y};
    z-index: 1001;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    & > div {
        margin: calc(var(--quintet) * 2.5) ;
        flex: 1 0 0;
        display: flex;
        flex-direction: column;
    }

    & > div > h1:first-child {
        margin: 0;
    }

    & > div > h2 {
        margin-top: 3px;
        position: relative;
        width: 100%;
        font-size: 17px;
        font-weight: 400;

        &:after {
            content: "";
            position: absolute;
            left: -calc(var(--quintet) * 2.5) ;
            display: block;
            width: calc(100% + 40px);
            height: var(--unit);
            background: #888888;
            margin: calc(var(--quintet) * 2.5)  0;
            opacity: 0.1;
        }
    }

    & > div > div:last-child {
        display: flex;
        flex-direction: row;
        justify-content: end;
        align-items: center;
        position: relative;
        height: calc(var(--decade) * 3.5) ;
        width: 100%;
        gap: calc(var(--quintet) * 2.5) ;

        &:after {
            content: "";
            position: absolute;
            left: -calc(var(--quintet) * 2.5) ;
            bottom: 100%;
            display: block;
            height: var(--unit);
            background: #888888;
            margin: calc(var(--quintet) * 2.5)  0;
            opacity: 0.1;
            width: calc(100% + 40px);
        }

        & > div,
        button {
            height: 100%;
            border-radius: 18px;
            padding: 0 calc(var(--quintet) * 2.5) ;
            background-color: rgba(255, 255, 255, 0.1);
            border: 0;
            color: #fff;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
        }
    }

    & > div > div:not(:last-child) {
        margin-bottom: calc(var(--decade) * 0.6) ;
        padding: 26px 0;
        flex: 1 0 0;
    }
`;

const Modal = ({
    Content,
    onClose,
    givenProps = {},
    size = { x: "400px", y: "400px" },
}) => {
    return (
        <ModalOverlay>
            <div className="_before" onClick={onClose}></div>
            <ModalContainer $size={size}>
                <Content closeModal={onClose} {...(givenProps || {})} />
            </ModalContainer>
        </ModalOverlay>
    );
};

export { ModalProvider };
