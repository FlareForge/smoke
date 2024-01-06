import { Container } from "./container";
import styled from "styled-components";



export default function Rank({gameData}) {

    const game = gameData;

    return (
        <Container>
            <Title>Rank</Title>
            <List>
                <Info>
                    <div>Friends</div>
                    <div>#1</div>
                </Info>
                <Info>
                    <div>City</div>
                    <div>#17</div>
                </Info>
                <Info>
                    <div>Country</div>
                    <div>#904</div>
                </Info>
                <Info>
                    <div>Region</div>
                    <div>#8305</div>
                </Info>
                <Info>
                    <div>World</div>
                    <div>#34995</div>
                </Info>
                <Info>
                    <div>Rank</div>
                    <div>Supersonic Legend</div>
                </Info>
                <Info>
                    <div>MMR</div>
                    <div>1900</div>
                </Info>
                <Info>
                    <div>Win-rate</div>
                    <div>63%</div>
                </Info>
                <Info>
                    <div>Games</div>
                    <div>1545</div>
                </Info>
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
`;

const Info = styled.div`
    cursor: pointer;
    width: 100%;
    height: calc(var(--decade) * 2);
    font-size: var(--font-size);
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: start;

    & > *:last-child {
        flex: 1;
        text-align: end;
    }
`;