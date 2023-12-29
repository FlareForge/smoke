import { EmulatorList } from "./shared";
import { useEffect, useState } from "react";
import Icon from "@Components/Icon";
import styled from "styled-components";

export default function ModulesSettings() {
    const [modules, setModules] = useState<ReturnType<typeof window.app.getServicesData>>({});

    useEffect(() => {
        updateModules();
    }, []);

    const updateModules = () => {
        setModules(window.app.getServicesData());
    };

    return (
        <>
            {Object.entries(modules).map( ([id, availableModules]) => {
                const enabledModulesLength = availableModules.filter(m => m.enabled).length;
                return <div key={id}>
                    <div> {id} </div>
                    <EmulatorList
                        style={{ height: "auto", marginTop: "calc(var(--decade) * 0.6) ", marginBottom: "calc(var(--decade) * 0.6) " }}
                    >
                        {
                            availableModules.map((module, i) => (
                                <div key={id+i}>
                                    <img
                                        src={"./platforms/nds.svg"}
                                        alt={module.name}
                                    />
                                    <div>{module.name?.toLowerCase()}</div>
                                    <div></div>
                                    <div></div>
                                    {module.enabled && <>
                                        <ModuleOption
                                            className="focusable"
                                            $disabled={i==(enabledModulesLength - 1)}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                window.app.changePriority(id, i, i+1);
                                                updateModules();
                                            }}
                                        >
                                            <Icon name="arrow-down-circle" />
                                        </ModuleOption>
                                        <ModuleOption
                                            className="focusable"
                                            $disabled={i==0}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                window.app.changePriority(id, i, i-1);
                                                updateModules();
                                            }}
                                        >
                                            <Icon name="arrow-up-circle" />
                                        </ModuleOption>
                                    </>}
                                    {module.enabled ? (
                                        <ModuleOption
                                            className="focusable"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                window.app.toggleService(id, module.id);
                                                updateModules();
                                            }}
                                        >
                                            <Icon name="check-circle" />
                                        </ModuleOption>
                                        
                                    ) : (
                                        <ModuleOption
                                            className="focusable"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                window.app.toggleService(id, module.id);
                                                updateModules();
                                            }}
                                        >
                                            <Icon name="circle" />
                                        </ModuleOption>
                                    )}
                                </div>
                            ))
                        }
                    </EmulatorList>
                </div>
            })}
        </>
    );
}

const ModuleOption = styled.div`
    padding: 0;
    text-align: center;
    width: calc(var(--quintet) * 3);
    height: calc(var(--quintet) * 3);
    cursor: pointer;
    pointer-events: ${(props: any) => (props.$disabled ? "none" : "all")};
    opacity: ${(props: any) => (props.$disabled ? "0.3" : "1")};
`;