import Avatar from "@Components/Avatar";
import { Container } from "./container";
import styled from "styled-components";

export default function Achievements({gameData, feedData}) {

    const game = gameData;
    const feed = feedData;

    return (
        <Container>
            <Split>
                <Title>Achievements</Title>
                <Progress>1%</Progress>
            </Split>
            <Wrap>
                <Avatar
                    scale="calc(var(--decade) * 3)"
                    radius="--mini-radius"
                />
                <Avatar
                    scale="calc(var(--decade) * 3)"
                    radius="--mini-radius"
                />
                <Avatar
                    scale="calc(var(--decade) * 3)"
                    radius="--mini-radius"
                />
                <Avatar
                    scale="calc(var(--decade) * 3)"
                    radius="--mini-radius"
                />
                <Avatar
                    scale="calc(var(--decade) * 3)"
                    radius="--mini-radius"
                />
            </Wrap>
        </Container>
    )
}

const Progress = styled.div`
    font-size: var(--font-size);
    font-weight: 700;
    opacity: 0.5;
`;

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

const Wrap = styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: row;
    gap: calc(var(--quintet) * 1);
    flex-wrap: wrap;
`;