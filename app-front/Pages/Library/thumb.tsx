import { useRef, useEffect, useState } from "react";
import styled from "styled-components";


export default function Thumb({ game, orientation = "portait", onClick}) {
    const targetRef = useRef(null);
    
    const [isVisible, setIsVisible] = useState(false);

    const isInViewport = () => {
        if (targetRef.current) {
            const rect = targetRef.current.getBoundingClientRect();
            const height = document.documentElement.clientHeight 
            return (rect.bottom >= -height && rect.top <= height*2);
        }
        return false;
    };

    const handleScroll = () => {
        setIsVisible(isInViewport());
    };

    useEffect(() => {
        handleScroll();
        const interval = setInterval(handleScroll, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <Game
            ref={targetRef}
            className="focusable"
            $orientation={orientation}
            $image={!isVisible ? "" : (game?.image || './images/unknown.png')}
            style={{ viewTransitionName: 'game-poster.'+game.id }}
            onClick={onClick}
        >
            
            <div>
                {game?.name || 'Unknown'}
            </div>
        </Game>
    );
}

const Game = styled.div`
    border-radius: 28px;
    aspect-ratio: ${(props: any) =>
        props.$orientation === "portrait"
            ? "0.747"
            : props.$orientation === "landscape"
            ? "1.338"
            : "1 / 1"};

    ${(props: any) => props.$image ? `
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        background-image: url('${props.$image}');
        box-shadow: 0px 0px 20px 20px rgba(0, 0, 0, 0.15);
        overflow: hidden;
        position: relative;

        &::before {
            content: "";
            position: absolute;
            border-radius: 27px;
            filter: blur(5px);
            width: 100%;
            height: 100%;
            background: linear-gradient(180deg, rgba(0, 0, 0, 0) 80.86%, #000 100%);
            transition-duration: 150ms;
            transition-property: opacity;
            opacity: 0;
        }

        &:hover::before,
        &.focused::before {
            opacity: 1;
        }

        & > div {
            position: absolute;
            bottom: 10px;
            left: 15px;
            font-size: 1.3rem;
            font-weight: 600;
            color: #fff;
            transition-duration: 150ms;
            transition-property: transform;
            transform: translateY(calc(100% + 10px));
        }

        &:hover > div,
        &.focused > div {
            transform: translateY(0px);
        }

    ` : `
        background-color: var(--grey);
        opacity: 0.5;
    `}
`;
