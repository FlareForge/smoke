import Avatar from "@Components/Avatar";
import { Container } from "./container";
import styled from "styled-components";

export default function Friends({gameData, feedData}) {

    const game = gameData;
    const feed = feedData;

    return (
        <Container>
            <h2>Friends</h2>
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
                <Avatar
                    scale="calc(var(--decade) * 3)"
                    radius="--mini-radius"
                />
            </Wrap>
        </Container>
    )
}

const Wrap = styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: row;
    gap: calc(var(--quintet) * 1);
    flex-wrap: wrap;
`;