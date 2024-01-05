import { Container } from "./container";
import styled from "styled-components";

const TAGS = [
    "Tools and Utilities",
    "Misc",
    "Fun",
    "World",
    "Improvements",
    "Multiplayer",
    "Mechanics",
    "Game Mode",
    "Libraries / APIs",
]

export default function ModTags({gameData, feedData}) {

    const game = gameData;
    const feed = feedData;

    return (
        <Container>
            <Title>Tags</Title>
            <List>
                {TAGS.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                ))}
            </List>
        </Container>
    )
}

const Title = styled.div`
    margin: 0;
    font-size: calc(var(--font-size) * 1.3);
    font-weight: 600;
`;

const List = styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    gap: var(--quintet);
`;

const Tag = styled.div`
    cursor: pointer;
    width: 100%;
    height: calc(var(--decade) * 2.5);
    padding: calc(var(--decade) * 0.5) calc(var(--decade) * 1);
    box-sizing: border-box;
    border-radius: var(--small-radius);
    background-color: rgba(255, 255, 255, 0.1);
    font-size: var(--font-size);
    display: flex;
    align-items: center;
    justify-content: start;

    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;