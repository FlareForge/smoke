import { Container } from "./container";
import styled from "styled-components";

export default function Inventory({gameData, feedData}) {

    const game = gameData;
    const feed = feedData;

    return (
        <Container>
            <h2>Inventory</h2>
            <Grid>
                <Image> <img src="" alt=""/> </Image>
                <Image> <img src="" alt=""/> </Image>
                <Image> <img src="" alt=""/> </Image>
                <Image> <img src="" alt=""/> </Image>
                <Image> <img src="" alt=""/> </Image>
                <Image> <img src="" alt=""/> </Image>
                <Image> <img src="" alt=""/> </Image>
                <Image> <img src="" alt=""/> </Image>
                <Image> <img src="" alt=""/> </Image>
                <Image> <img src="" alt=""/> </Image>
                <Image> <img src="" alt=""/> </Image>
                <Image> <img src="" alt=""/> </Image>
                <Image> <img src="" alt=""/> </Image>
                <Image> <img src="" alt=""/> </Image>
                <Image> <img src="" alt=""/> </Image>
                <Image> <img src="" alt=""/> </Image>
            </Grid>
        </Container>
    )
}

const Grid = styled.div`
    width: 100%;
    height: max-content;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 1fr;
    gap: calc(var(--quintet) * 1);

    & > div {
        width: 100%;
        aspect-ratio: 1/1;
        border-radius: var(--mini-radius);
        overflow: hidden;
        background-color: rgba(255, 255, 255, 0.05);
    }
`;

const Image = styled.div`
    width: 100%;
    height: 100%;
    border-radius: var(--mini-radius);
    object-fit: cover;
    object-position: center center;
`;