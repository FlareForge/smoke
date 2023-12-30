import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import GeneralSettings from "./general";
import InterfaceSettings from "./interface";
import GamesSettings from "./games";
import AccountSettings from "./account";
import ModulesSettings from "./modules";
import DeviceSettings from "./device";
import LibrarySettings from "./library";
import EmulatorsSettings from "./emulator";

export default function Settings() {
    let { section } = useParams();
    const navigate = useNavigate();

    const setSection = (section) => {
        navigate(`/settings/${section}`);
    }

    let content = null;

    switch (section) {
        case "interface":
            content = <InterfaceSettings />;
            break;
        case "emulators":
            content = <EmulatorsSettings />;
            break;
        case "library":
            content = <LibrarySettings />;
            break;
        case "device":
            content = <DeviceSettings />;
            break;
        case "modules":
            content = <ModulesSettings />;
            break;
        case "account":
            content = <AccountSettings />;
            break;
        case "games":
            content = <GamesSettings />;
            break;
        default:
            content = <GeneralSettings />;
            break;
    }

    return (
        <Container>
            <SideBar>
                <Section
                    className="focusable"
                    onClick={() => setSection("general")}
                    $selected={section === "general"}
                >
                    General
                </Section>
                <Section
                    className="focusable"
                    onClick={() => setSection("interface")}
                    $selected={section === "interface"}
                >
                    Interface
                </Section>
                <Section
                    className="focusable"
                    onClick={() => setSection("library")}
                    $selected={section === "library"}
                >
                    Library
                </Section>
                <Section
                    className="focusable"
                    onClick={() => setSection("games")}
                    $selected={section === "games"}
                >
                    Games
                </Section>
                <Section
                    className="focusable"
                    onClick={() => setSection("emulators")}
                    $selected={section === "emulators"}
                >
                    Emulators
                </Section>
                <Section className="soon">Mods</Section>
                <Section
                    className="focusable"
                    onClick={() => setSection("modules")}
                    $selected={section === "modules"}
                >
                    Modules
                </Section>
                <Section className="soon">Addons</Section>
                <Section
                    className="focusable"
                    onClick={() => setSection("account")}
                    $selected={section === "account"}
                >
                    Account
                </Section>
                <Section
                    className="focusable"
                    onClick={() => setSection("device")}
                    $selected={section === "device"}
                >
                    Device
                </Section>
            </SideBar>
            <PageContainer>
                { content }
            </PageContainer>
        </Container>
    );
}

const Section = styled.div`
    padding: calc(var(--decade) * 1)  calc(var(--quintet) * 2.5) ;
    font-size: calc(var(--quintet) * 2.5) ;
    font-weight: ${(props: any) => (props.$selected ? "600" : "400")};
    cursor: pointer;
    transition-duration: 0.1s;
    transition-property: background-color;
    background-color: rgba(255, 255, 255, 0);
    border-radius: var(--small-radius) 0 0 var(--small-radius);
    ${(props: any) =>
        props.$selected ? "background-color: rgba(255, 255, 255, 0.1);" : ""}

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

const Container = styled.div`
    width: 100%;
    display: flex;
    height: 100%;
`;

const SideBar = styled.div`
    display: flex;
    flex-direction: column;
    gap: calc(var(--decade) * 0.6) ;
    width: 20vw;
    height: 100%;
    border-right: var(--border-size) solid rgba(255, 255, 255, 0.1);
`;

const PageContainer = styled.div`
    flex: 1;
    height: 100%;
    box-sizing: border-box;
    overflow-y: overlay;

    & > *:not(.vertical-list) {
        margin-left: calc(var(--decade) * 2.5);
    }
`;