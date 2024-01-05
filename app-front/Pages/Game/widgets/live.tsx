import { Container } from "./container";
import styled from "styled-components";
import { TwitchEmbed } from 'react-twitch-embed';

export default function Live({gameData, feedData}) {

    const game = gameData;
    const feed = feedData;

    return (
        <CustomContainer>
            <Image>
                <TwitchEmbed
                    channel={feed?.stream || "theprimeagen"}
                    width="200%"
                    height="200%"
                    withChat={false}
                    darkMode={true}
                    autoplay
                    muted
                    allowFullscreen={true}
                />
            </Image>
            <Title>Live</Title>
        </CustomContainer>
    )
}

const CustomContainer = styled(Container)`
    position: relative;
    background-color: color-mix(in srgb, var(--main), transparent 80%);

    & > *:last-child {
        opacity: 1;
        transition-property: opacity;
        transition-duration: 0.2s;
    }

    &:hover{
        & > *:last-child {
            opacity: 0;
        }
    }
`;

const Title = styled.div`
    font-size: var(--font-size);
    font-weight: 700;
    color: var(--primary);
    position: absolute;
    top: calc(var(--quintet) * 3);
    left: calc(var(--quintet) * 3.4);
    display: flex;
    align-items: center;
    gap: calc(var(--quintet) * 1.3);

    &:before {
        content: "";
        display: block;
        width: calc(var(--quintet) * 1.5);
        height: calc(var(--quintet) * 1.5);
        border-radius: 50%;
        background-color: var(--main);
        top: calc(var(--quintet) * -1);
        left: calc(var(--quintet) * -1);
    }
`;

const Image = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: var(--mini-radius);
    object-fit: cover;
    object-position: center center;
    width: 100%;
    aspect-ratio: 16/9;
    border-radius: var(--mini-radius);
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.05);

    & > * {
        transform-origin: top left;
        transform: scale(0.5);
    }
`;