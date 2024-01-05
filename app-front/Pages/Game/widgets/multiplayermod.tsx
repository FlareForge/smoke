import Button from "@Components/Button";
import { Container } from "./container";
import styled from "styled-components";

export default function MultiplayerMod({gameData, feedData}) {

    const game = gameData;
    const feed = feedData;

    return (
        <Container>
            <Title>Multiplayer Mod</Title>
            <Description>Recommended multiplayer mod compatible with smoke:</Description>
            <ModInfo>
                <LefSide>
                    <Title>SA-MP</Title>
                    <Author>By openmultiplayer</Author>
                </LefSide>
                <Button
                    onClick={() => {}}
                >
                    Install
                </Button>
            </ModInfo>
        </Container>
    )
}

const Title = styled.div`
    margin: 0;
    font-size: calc(var(--font-size) * 1.3);
    font-weight: 600;
`;

const Description = styled.div`
    width: 100%;
    height: max-content;
    font-size: calc(var(--font-size) * 0.9);
    opacity: 0.5;
`;

const ModInfo = styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: calc(var(--quintet) * 1);

    & > *:last-child {
        width: calc(var(--decade) * 8);
    }
`;

const LefSide = styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    gap: calc(var(--quintet) * 0.5);
`;

const Author = styled.div`
    font-size: calc(var(--font-size) * 0.9);
    opacity: 0.5;
`;