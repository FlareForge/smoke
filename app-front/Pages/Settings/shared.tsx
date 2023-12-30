import Icon from "@Components/Icon";
import { useState } from "react";
import styled from "styled-components";

export function SchemaSettings({ schema, data, setData }) {
    return <>
        {Object.entries(schema).map(([key, value]: [string, any]) => {
            let input = null;
            switch(value.type) {
                case "string":
                    input = <input
                        className="focusable"
                        type="text"
                        name="body"
                        value={data[key]}
                        onChange={(e) => setData({ [key]: e.target.value})}
                    />
                    break;
                case "number":
                    input = <input
                        className="focusable"
                        type="number"
                        name="body"
                        value={data[key]}
                        onChange={(e) => setData({ [key]: e.target.value})}
                    />
                    break;
                case "boolean":
                    input = <input
                        className="focusable"
                        type="checkbox"
                        name="body"
                        checked={data[key]}
                        onChange={(e) => setData({ [key]: e.target.checked})}
                    />
                    break;
                case "array":
                    let elements = [];
                    if(data[key] && !data[key].length && data[key]?.[0]) elements = Object.values(data[key]);
                    if(data[key] && data[key].length) elements = data[key];
                    return <div key={key}>
                        <SettingEntry>
                            <div>{value.label}</div>
                            <div
                                className="focusable"
                                onClick={() => {
                                    const _args = data[key];
                                    if(_args.push){
                                        _args.push("");
                                    }else{
                                        _args[Object.keys(_args).length] = "";
                                    }
                                    setData({ [key]: _args });
                                }}
                            >
                                Add
                            </div>
                        </SettingEntry>
                        {elements.map((arg, i) => (
                            <SettingEntry key={i}>
                                <div>{value.label + " " + i}</div>
                                <input
                                    type="text"
                                    name="body"
                                    value={arg}
                                    className="focusable"
                                    style={{width: '300px'}}
                                    onChange={(e) => {
                                        const _args = data[key];
                                        _args[i] = e.target.value;
                                        setData({ [key]: _args });
                                    }}
                                />
                                <div
                                    style={{ width: "40px", padding: "calc(var(--decade) * 0.6) " }}
                                    className="focusable"
                                    onClick={() => {
                                        let _args = data[key];
                                        if(_args.splice){
                                            _args.splice(i, 1);
                                        }else{
                                            delete _args[i];
                                            _args = Object.values(_args);
                                        }
                                        setData({ [key]: _args });
                                    }}
                                >
                                    <Icon name="close" />
                                </div>
                            </SettingEntry>
                        ))}
                    </div>
                default:
                    return null;
            }

            return <SettingEntry key={key}>
                <div>{value.label}</div>
                {input}
            </SettingEntry>
        })}
    </>
}

export function MappingSettings({ data, setData }) {
    const [detectText, setDetectText] = useState("Detect");

    return <>
        <h2>Mapping</h2>
        <SettingEntry
            style={{marginTop: "calc(var(--quintet) * 2.5) "}}
        >
            <div>Add a new input button</div>
            <div
                className="focusable"
                onClick={async () => {
                    if(detectText !== "Detect") return;
                    let stop = false
                    window.app.Services.Controller.detectInput(async (key) => {
                        if(!key) return;
                        if(stop) return;

                        stop = true;
                        if(data[key]) {
                            setDetectText("Already mapped");
                            await new Promise((resolve) => setTimeout(resolve, 2000));
                            setDetectText("Detect");
                            return;
                        }
                        const _mapping = {
                            ...data,
                            [key]: "",
                        }
                        setDetectText(key + " - added");
                        setData(_mapping);
                        await new Promise((resolve) => setTimeout(resolve, 2000));
                        setDetectText("Detect");
                    })
                    for(let i = 5; i > 0; i--){
                        if(stop) return;
                        setDetectText(`Press a key - ${i}s`);
                        await new Promise((resolve) => setTimeout(resolve, 1000));
                    }
                    setDetectText("Detect");
                    stop = true;
                }}
            >
                {detectText}
            </div>
        </SettingEntry>
        {Object.entries(data).map(([key, value]: [string, any]) => {
            return <SettingEntry key={key}>
                <div>{key}</div>
                <input
                    className="focusable"
                    type="text"
                    name="body"
                    value={value}
                    onChange={(e) => setData({ [key]: e.target.value})}
                />
                <div
                    className="focusable"
                    style={{ width: "40px", padding: "calc(var(--decade) * 0.6) " }}
                    onClick={() => {
                        let _args = data;
                        delete _args[key];
                        setData(_args);
                    }}
                >
                    <Icon name="close" />
                </div>
            </SettingEntry>
        })}
    </>
}

export const SettingEntry = styled.div`
    display: flex;
    flex-direction: row;
    gap: calc(var(--decade) * 0.6) ;
    align-items: center;
    padding: 5px 5px;
    position: relative;
    height: 40px;

    & > *:not(:first-child) {
        box-sizing: border-box;
        /* border: var(--unit) solid rgba(255, 255, 255, 0.1); */
        border: var(--unit) solid rgb(131, 131, 131);
        width: 200px;
        height: 100%;
        border-radius: 8px;
        font-size: 17px;
        background-color: rgba(255, 255, 255, 0.3);
        background-size: cover;
        background-position: center center;
        cursor: pointer;
        color: #fff;
        padding: calc(var(--decade) * 0.6)  calc(var(--quintet) * 2.5) ;
        display: flex;
        align-items: center;
        justify-content: center;

        &:focus {
            outline: 0;
        }

        & option {
            background: var(--dark);
            border: 0;
            padding: calc(var(--decade) * 0.6)  calc(var(--quintet) * 2.5) ;
        }

        &.image {
            aspect-ratio: 1/1;
            overflow: hidden;
            height: 100px;
            width: 100px;

            &:hover {
                opacity: 0.8;
            }
        }
    }

    & > input[type="color"]:not(:first-child) {
        padding: 0;
        height: 100%;
        overflow: hidden;

        &::-webkit-color-swatch-wrapper {
            padding: 0;
        }
        &::-webkit-color-swatch {
            border: none;
        }
    }

    & > input[type="checkbox"]:not(:first-child) {
        width: 30px;
    }

    & > div:first-child {
        flex: 1 0 0;
    }
`;

export const EmulatorList = styled.div.attrs((_) => ({
    className: 'vertical-list'
}))`
    pointer-events: ${(props: any) => (props.$locked ? "none" : "all")};
    opacity: ${(props: any) => (props.$locked ? "0.5" : "1")};
    display: flex;
    flex-direction: column;
    gap: calc(var(--decade) * 0.2);
    height: 100%;
    overflow: hidden;
    background-color: var(--grey);
    overflow-y: overlay;
    overflow-x: hidden;
    border-radius: 0 var(--radius) var(--radius) 0;

    & > div {
        box-sizing: border-box;
        width: 100%;
        border: 0;
        padding: calc(var(--decade) * 0.6) ;
        color: #fff;
        font-weight: 600;
        font-size: calc(var(--quintet) * 2.5) ;
        display: flex;
        align-items: center;
        justify-content: start;
        gap: var(--decade);
        background-color: rgba(255, 255, 255, 0.1); 
        cursor: pointer;

        &:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }

        & > img {
            width: calc(var(--quintet) * 4) ;
            height: calc(var(--quintet) * 4) ;
            margin-left: 6px;
        }

        & > div:nth-child(3) {
            flex: 1 0 0;
        }

        & > div:nth-child(4) {
            font-size: 18px;
            font-weight: 500;
            text-align: right;
            opacity: 0.5;
            cursor: pointer;
            border-radius: 8px;
            padding: 5px calc(var(--decade) * 0.6) ;

            &:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }
        }
    }
`;