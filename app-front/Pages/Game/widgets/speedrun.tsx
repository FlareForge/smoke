import Avatar from "@Components/Avatar";
import { Container } from "./container";
import styled from "styled-components";

export default function Speedrun({gameData}) {

    const game = gameData;

    return (
        <Container>
            <Split>
                <Title>Speedrun</Title>
                <Description>Any% Glitchless</Description>
            </Split>
            <Leaderboard>
                <Entry>
                    <Avatar
                        scale="calc(var(--decade) * 3)"
                        radius="--mini-radius"
                    />
                    <div>Zylenox</div>
                    <div>0:07:45:828</div>
                </Entry>
                <Entry>
                    <Avatar
                        scale="calc(var(--decade) * 3)"
                        radius="--mini-radius"
                    />
                    <div>Zylenox</div>
                    <div>0:07:45:828</div>
                </Entry>
                <Entry>
                    <Avatar
                        scale="calc(var(--decade) * 3)"
                        radius="--mini-radius"
                    />
                    <div>Zylenox</div>
                    <div>0:07:45:828</div>
                </Entry>
                <Entry>
                    <Avatar
                        scale="calc(var(--decade) * 3)"
                        radius="--mini-radius"
                    />
                    <div>Zylenox</div>
                    <div>0:07:45:828</div>
                </Entry>
                <Entry>
                    <Avatar
                        scale="calc(var(--decade) * 3)"
                        radius="--mini-radius"
                    />
                    <div>Zylenox</div>
                    <div>0:07:45:828</div>
                </Entry>
            </Leaderboard>
        </Container>
    )
}

const Split = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;    
    margin-bottom: calc(var(--quintet) * 1);
`;

const Title = styled.h2`
    margin: 0;
    font-size: calc(var(--font-size) * 1.3);
`;

const Entry = styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: calc(var(--quintet) * 1);

    & > div:nth-child(2) {
        font-weight: 600;
        font-size: calc(var(--font-size) * 0.9);
    }

    & > div:nth-child(3) {
        font-weight: 700;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: end;
        font-size: calc(var(--font-size) * 0.9);
    }


`;

const Description = styled.div`
    font-size: calc(var(--font-size) * 0.9);
    opacity: 0.5;
`;

const Leaderboard = styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    gap: calc(var(--quintet) * 1);
`;