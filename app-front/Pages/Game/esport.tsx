import styled from "styled-components";
import { useEffect, useState } from "react";
import { useContentTransition } from "@Components/Transition";
import MultiplayerMod from "./widgets/multiplayermod";
import ModTags from "./widgets/multiplayertags";
import Button from "@Components/Button";
import Icon from "@Components/Icon";
import Search from "./widgets/search";
import WikiPages from "./widgets/wikipages";
import Avatar from "@Components/Avatar";
import Speedrun from "./widgets/speedrun";

export default function Esport({gameData, feedData}){

    const transition = useContentTransition();
    const wiki = feedData?.wiki || {};
    const [openPage, setOpenPage] = useState(null);
    
    const changePage = (post) => {
        transition(() => {
            setOpenPage(post);
        })
    }

    useEffect(() => {
        changePage(Object.keys(wiki)[0]);
    }, [wiki])
    
    return (
        <>

            <Page>
                <Row>
                    <Section>
                        <Title>Top Players</Title>
                        {
                            Array(10).fill(0).map((_, i) => (
                                <LeaderboardRow
                                    key={i}
                                >
                                    <div>{i+1}.</div>
                                    <Avatar
                                        scale='calc(var(--decade) * 3)'
                                    />
                                    <div>Player</div>
                                    <div>535 points</div>
                                </LeaderboardRow>
                            ))
                        }
                    </Section>
                    <Section>
                        <Title>Top Teams</Title>
                        {
                            Array(10).fill(0).map((_, i) => (
                                <LeaderboardRow
                                    key={i}
                                >
                                    <div>{i+1}.</div>
                                    <Avatar
                                        scale='calc(var(--decade) * 3)'
                                    />
                                    <div>Team</div>
                                    <div>535 points</div>
                                </LeaderboardRow>
                            ))
                        }
                    </Section>
                </Row>
                <Section>
                    <Title>Upcoming Matches</Title>
                </Section>
                <Section>
                    <Title>Season Results</Title>
                </Section>
            </Page>
            <WidgetsContainer>
                <Speedrun gameData={gameData} feedData={feedData} />
            </WidgetsContainer>
        </>
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

const Section = styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    gap: calc(var(--decade) * 0.5);
    position: relative;
    padding: calc(var(--decade) * 1);
    box-sizing: border-box;
    border-radius: var(--radius);
    background-color: ${(props: any) => props.$special ? "color-mix(in srgb, var(--main), transparent 80%)" : "rgba(255, 255, 255, 0.1)"};
    overflow: hidden;

`;

const Title = styled.div`
    font-size: calc(var(--font-size) * 1.2);
    font-weight: 700;
`;

const Row = styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: row;
    gap: calc(var(--decade) * 1);
`;

const Page = styled.div`
    gap: calc(var(--decade) * 1);
    margin-top: calc(var(--quintet) * 2.5) ;
    width: 100%;
    flex: 1 0 0;    
    height: max-content;
    display: flex;
    flex-direction: column;
`;

const LeaderboardRow = styled.div`
    width: 100%;
    height: calc(var(--decade) * 4);
    display: flex;
    flex-direction: row;
    gap: calc(var(--decade) * 1);
    padding: calc(var(--decade) * 1);
    box-sizing: border-box;
    border-radius: var(--small-radius);
    background-color: rgba(255, 255, 255, 0.1);
    overflow: hidden;
    align-items: center;
    font-size: calc(var(--font-size) * 1);
    font-weight: 600;

    & > *:first-child {
        width: calc(var(--decade) * 1.5);
    }

    & > *:last-child {
        flex: 1;
        text-align: end;
    }
`;