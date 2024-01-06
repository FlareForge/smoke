import styled from "styled-components";
import Entry from "./entry";
import { useEffect, useState } from "react";
import { useContentTransition } from "@Components/Transition";
import MultiplayerMod from "./widgets/multiplayermod";
import ModTags from "./widgets/multiplayertags";
import Button from "@Components/Button";

export default function Multiplayer({gameData}){

    const transition = useContentTransition();
    const [servers, setServers] = useState(null);
    const [openPost, setOpenPost] = useState(null);
    const isGrid = false;

    useEffect(() => {
        updateServers();
    }, [gameData])
    
    const changePost = (post) => {
        transition(() => {
            setOpenPost(post);
        })
    }

    const updateServers = () => {
        window.app.Services.Multiplayer.getServers(gameData).then(setServers)
    }

    // const fkComment = {
    //     id: "2093I",
    //     type: "comment",
    //     title: "Comment",
    //     description: "This is a comment",
    //     date: "2021-05-20",
    //     image: null,
    //     sender: {
    //         username: "Unknown player",
    //         avatar: null,
    //     },
    // };

    let content = null
    if(openPost && false) {
        // content = <>
        //     <PostsContainer>
        //         <Entry
        //             open={true}
        //             id={openPost.id}
        //             type={openPost.type}
        //             title={openPost.title}
        //             description={openPost.description}
        //             date={openPost.date}
        //             image={openPost.image}
        //             sender={openPost.sender}
        //             height={"max-content"}
        //             action={() => {changePost(null)}}
        //         >
        //             <Button>
        //                 <Icon name="thumbs-up" />
        //             </Button>
        //             <Button>
        //                 <Icon name="thumbs-down" />
        //             </Button>
        //             <Button onClick={(e) => { e.stopPropagation();}}>
        //                 Connect
        //             </Button>
        //         </Entry>
        //         {Array(5).fill(0).map((_, i) =>
        //             <Entry
        //                 key={i}
        //                 id={fkComment.id+i}
        //                 type={fkComment.type}
        //                 title={fkComment.title}
        //                 description={fkComment.description}
        //                 date={fkComment.date}
        //                 image={fkComment.image}
        //                 sender={fkComment.sender}
        //                 height={"calc(var(--decade) * 15)"}
        //                 action={() => {}}
        //             />
        //         )}
        //     </PostsContainer>
        // </>
    } else {
        content = <>
            <PostsContainer
                $isGrid={isGrid}
            >
                {
                    !servers?.length ? <h2>No data available yet</h2> :
                    (servers || [])?.map((server: any, i: number) => 
                        <Entry
                            key={i}
                            type={server.version}
                            date={server.address}
                            // id={server.id}
                            title={server.name}
                            description={(server.tags || []).join(", ")}
                            image={server.icon}
                            background={server.icon}
                            height={'calc(var(--decade) * 13)'}
                            action={() => {changePost(server)}}
                            special={true}
                            square={true}
                        >
                            {/* <Button>
                                <Icon name="thumbs-up" />
                            </Button>
                            <Button>
                                <Icon name="thumbs-down" />
                            </Button> */}
                            <Button onClick={(e) => {
                                e.stopPropagation();
                                // window.app.Services.Multiplayer.playOnServer(gameData, server)
                                navigator.clipboard.writeText(server.address);
                            }}>
                                Copy address
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
                <MultiplayerMod gameData={gameData}/>
                <ModTags gameData={gameData}/>
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