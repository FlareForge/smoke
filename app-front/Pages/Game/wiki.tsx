import styled from "styled-components";
import Entry from "./entry";
import { useEffect, useState } from "react";
import { useContentTransition } from "@Components/Transition";
import MultiplayerMod from "./widgets/multiplayermod";
import ModTags from "./widgets/multiplayertags";
import Button from "@Components/Button";
import Icon from "@Components/Icon";
import Search from "./widgets/search";
import WikiPages from "./widgets/wikipages";

export default function Wiki({gameData}){

    const transition = useContentTransition();
    const wiki = gameData?.wiki || {};
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
            <PostsPage>
                <PostsContainer>
                    {(wiki?.[openPage] || []).map((post, i) =>
                        <Entry
                            key={i}
                            type={""}
                            title={post.title}
                            description={post.content}
                            action={() => {changePage(null)}}
                        >
                            <></>
                        </Entry>
                    )}
                </PostsContainer>
            </PostsPage>
            <WidgetsContainer>
                <Search gameData={gameData} />
                <WikiPages pages={Object.keys(wiki)} onChangePage={changePage} />
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

const PostsContainer = styled.div`
    width: 100%;
    height: max-content;
    display: ${(props: any) => props.$isGrid ? "grid" : "flex"};
    flex-direction: column;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: calc(var(--decade) * 20);
    gap: calc(var(--quintet) * 2.5) ;
`;

const PostsPage = styled.div`
    margin-top: calc(var(--quintet) * 2.5) ;
    width: 100%;
    flex: 1 0 0;    
    height: max-content;
`;