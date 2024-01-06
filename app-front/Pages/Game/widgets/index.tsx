import styled from "styled-components";
import Friends from "./friends";
import Achievements from "./achievements";
import Gallery from "./gallery";
import Speedrun from "./speedrun";
import Inventory from "./inventory";
import Live from "./live";

export default function Widgets({gameData, feedData = {}}){

    const hasLive = true;

    return (
        <WidgetsContainer>
            <Friends gameData={gameData} feedData={feedData} />
            {hasLive && <Live gameData={gameData} feedData={feedData} />}
            <Achievements gameData={gameData} feedData={feedData} />
            <Gallery gameData={gameData} feedData={feedData} />
            <Speedrun gameData={gameData} />
            <Inventory gameData={gameData} feedData={feedData} />
        </WidgetsContainer>
    )
}

const WidgetsContainer = styled.div`
    margin-top: calc(var(--quintet) * 2.5) ;
    width: calc(var(--decade) * 22.5);
    height: max-content;
    display: flex;
    flex-direction: column;
    gap: calc(var(--quintet) * 2.5) ;
`;

