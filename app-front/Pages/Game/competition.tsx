import styled from "styled-components";
import Entry from "./entry";
import { useState } from "react";
import { useContentTransition } from "@Components/Transition";
import MultiplayerMod from "./widgets/multiplayermod";
import ModTags from "./widgets/multiplayertags";
import Button from "@Components/Button";
import Icon from "@Components/Icon";
import Rank from "./widgets/rank";

export default function Competition({gameData, feedData}){

    const transition = useContentTransition();
    const posts = feedData?.competitions || [];
    const [openPost, setOpenPost] = useState(null);
    const isGrid = false;
    
    const changePost = (post) => {
        transition(() => {
            setOpenPost(post);
        })
    }

    const fkComment = {
        id: "2093I",
        type: "comment",
        title: "Comment",
        description: "This is a comment",
        date: "2021-05-20",
        image: null,
        sender: {
            username: "Unknown player",
            avatar: null,
        },
    };

    let content = null
    if(openPost) {
        content = <>
            <PostsContainer>
                <Entry
                    open={true}
                    id={openPost.id}
                    type={openPost.type}
                    title={openPost.title}
                    description={openPost.description}
                    date={openPost.date}
                    image={openPost.image}
                    sender={openPost.sender}
                    height={"max-content"}
                    action={() => {changePost(null)}}
                >
                    <Button onClick={(e) => { e.stopPropagation();}}>
                        Join
                    </Button>
                </Entry>
                {Array(5).fill(0).map((_, i) =>
                    <Entry
                        key={i}
                        id={fkComment.id+i}
                        type={fkComment.type}
                        title={fkComment.title}
                        description={fkComment.description}
                        date={fkComment.date}
                        image={fkComment.image}
                        sender={fkComment.sender}
                        height={"calc(var(--decade) * 15)"}
                        action={() => {}}
                    />
                )}
            </PostsContainer>
        </>
    } else {
        content = <>
            {/* <Special>
                <Entry
                    id={posts?.[0]?.id}
                    special={true}
                    type={posts?.[0]?.type}
                    title={posts?.[0]?.title}
                    description={posts?.[0]?.description}
                    date={posts?.[0]?.date}
                    image={posts?.[0]?.image}
                    sender={posts?.[0]?.sender}
                    height={"calc(var(--decade) * 10)"}
                    action={() => {}}
                />
            </Special> */}
            <PostsContainer
                $isGrid={isGrid}
            >
                {
                    !posts?.length ? <h2>No data available yet</h2> :
                    posts.map((post: any, i: number) => 
                        <Entry
                            type={post.type}
                            key={i}
                            id={post.id}
                            title={post.title}
                            description={post.description}
                            date={post.date}
                            image={post.image}
                            sender={post.sender}
                            height={'calc(var(--decade) * 13)'}
                            action={() => {changePost(post)}}
                            special={true}
                        >
                            <Button onClick={(e) => { e.stopPropagation();}}>
                                Join
                            </Button>
                        </Entry>
                    )
                }
            </PostsContainer>
        </>
    }
    
    return (
        <>
            <PostsPage>
                { content }
            </PostsPage>
            <WidgetsContainer>
                <Rank gameData={gameData} feedData={feedData} />
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


const Special = styled.div`
    width: 100%;
    height: max-content;
    margin-bottom: calc(var(--quintet) * 2.5);
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