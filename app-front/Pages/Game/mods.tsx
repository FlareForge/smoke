import styled from "styled-components";
import { useState, useEffect } from "react";
import Entry from "./entry";

export default function Mods({gameData}){

    const [posts, setPosts] = useState([]);

    const gameBanner = gameData?.banner || gameData?.image || './images/unknown.png'

    useEffect(() => {
        setPosts([{
            type: 'mod',
            title: 'Game Patch 4',
            description: 'This is the first update for the game',
            date: '2021-07-01',
            image: ''
        }])
    }, []);
    
    return (
        <PostsContainer>
            {
                posts.map((post: any, i: number) => 
                    <Entry
                        type={post.type}
                        key={i}
                        title={post.title}
                        description={post.description}
                        date={post.date}
                        image={post.image || gameBanner}
                        action={() => {
                            window.app.Services.Mods.installMod(gameData, {
                                id: "2093I",
                                injection: "xdelta",
                                name: "Game Patch 4",
                                path: ""
                            });
                        }}
                    />
                )
            }
        </PostsContainer>
    )
}

const PostsContainer = styled.div`
    margin-top: 20px;
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;
