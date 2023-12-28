import styled from "styled-components";
import { useEffect, useState } from "react";
import Entry from "./entry";

export default function Posts({gameData}){

    const [posts, setPosts] = useState([]);

    const gameBanner = gameData?.banner || gameData?.image || './images/unknown.png'

    useEffect(() => {
        // const l = [];
        // for(let i = 0; i < 10; i++) l.push({
        //     type: 'post',
        //     title: 'Game Patch 4',
        //     description: 'This is the first update for the game',
        //     date: '2021-07-01',
        //     image: ''
        // });
        // setPosts(l)
    }, []);

    return (
        <PostsContainer>
            {
                posts.length === 0 ? <h2>No data available yet</h2> :
                posts.map((post: any, i: number) => 
                    <Entry
                        type={post.type}
                        key={i}
                        title={post.title}
                        description={post.description}
                        date={post.date}
                        image={post.image || gameBanner}
                        action={() => {}}
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

