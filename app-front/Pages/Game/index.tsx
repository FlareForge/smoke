import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import HeadBar from "../../Components/HeadBar";
import Icon from "../../Components/Icon";
import useTransition, { useContentTransition } from "../../Components/Transition";
import Loader from "../../Components/Loader";
import Posts from "./posts";
import Mods from "./mods";
import { Game } from "../../../app-back/Services/Storage/abstract";

export default function GamePage() {
    let { id } = useParams();
    const navigate = useTransition();
    const contentTransition = useContentTransition();
    const [gameData, setGameData] = useState<Game>(null);
    const [gameLoading, setGameLoading] = useState(false);
    const [gameRunning, setGameRunning] = useState(false);
    const [openPage, setOpenPage] = useState('posts');

    useEffect(() => {
        window.app.Services.Storage.getGame(id).then(setGameData);

        const interval = setInterval(() => {
            if(document.hidden) return;
            window.app.Services.Emulator.isGameRunning(gameData).then(setGameRunning);
        }, 10000)

        return () => clearInterval(interval)
    }, []);

    const setPage = (page) => {
        contentTransition(() => {
            setOpenPage(page);
        });
    }

    const buttonAction = async () => {
        if(gameRunning){
            await window.app.Services.Emulator.shutdownGame(gameData);
            setGameRunning(false);
            return;
        }
        setGameLoading(true);
        await window.app.Services.Emulator.startGame(gameData);
        const notification = new Notification("Tip", {
            body: "Use shift + Backspace to open the overlay and see the controls layout.",
        });
        notification.onclick = () => {};
        setGameRunning(true);
        setGameLoading(false);
    }

    const buttonText =
        gameLoading ? <Loader size="calc(var(--quintet) * 2.5) "/> :
        gameRunning ? 'Stop' :
        'Play';

    const description = (gameData?.description || 'Unknown').slice(0, 200) + (gameData?.description?.length > 200 ? '...' : '');
    const gameBanner = gameData?.banner || gameData?.image || './images/unknown.png'
    const gamePoster = gameData?.image || './images/unknown.png'

    let content = null;
    if(openPage === 'posts'){
        content = <Posts gameData={gameData}/>
    }else if(openPage === 'mods'){
        content = <Mods gameData={gameData}/>
    }

    return (
        <Container>
            <Banner>
                <BackButton
                    className="focusable"
                    onClick={() => navigate('/library')}
                >
                    <Icon name="arrow-right" />
                </BackButton>
                <BlurImage
                    $image={gamePoster}
                    style={{ viewTransitionName: 'game-poster.'+gameData?.id }}
                />
                <MaskHorizontal>
                    <div>
                        <BannerImage
                            $image={gameBanner}
                        />
                    </div>
                </MaskHorizontal>
                <Details>
                    <Title>
                        {gameData?.name || 'Unknown'}
                    </Title>
                    <Description>{description}</Description>
                    <Button
                        onClick={ buttonAction }
                        $running={gameRunning}
                        $loading={gameLoading}
                        className="focusable"
                    >
                        { buttonText }
                    </Button>
                </Details>
            </Banner>
            <HeadBar
                drop="blur(5px)"
            >
                <div
                    className="soon"
                    onClick={() => setPage('posts')}
                >
                    <p>Feed</p>
                </div>
                <div
                    className="soon"
                >
                    <p>Forum</p>
                </div>
                <div
                    className="soon"
                >
                    <p>News</p>
                </div>
                <div
                    // className="focusable"
                    className="soon"
                    // onClick={() => setPage('mods')}
                >
                    <p>Mods</p>
                </div>
                <div
                    className="soon"
                >
                    <p>Market</p>
                </div>
                <div
                    className="soon"
                >
                    <p>Guides</p>
                </div>
                <div
                    className="soon"
                >
                    <p>Live</p>
                </div>
                <div
                    className="focusable"
                    onClick={async () => {
                        await window.app.Services.Emulator.uninstallGame(gameData);
                        await window.app.Services.Storage.removeGame(gameData);
                        navigate('/library');
                    }}
                >
                    <p>Uninstall</p>
                </div>
                <div
                    className="focusable"
                    onClick={() => navigate("/settings/games/"+gameData?.id)}
                >
                    <p>Settings</p>
                </div>
                <Last
                    className="soon"
                >
                    <Icon name={"clock"} />
                    <TimePlayed>
                        <p>Time Played</p>
                        <p>{gameData?.timePlayed || '0'}h</p>
                    </TimePlayed>
                </Last>
            </HeadBar>
            { content }
        </Container>
    );
}

const BackButton = styled.div`
    position: fixed;
    display: flex;
    justify-content: end;
    align-items: center;
    top: calc(var(--padding) + var(--nav-height));
    right: calc(100% - var(--decade) * 7);
    width: calc(var(--decade) * 7);
    height: (var(--decade) * 4);
    padding: var(--decade) calc(var(--quintet) * 4);
    border-radius: calc(var(--decade) * 4);
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(var(--quintet));
    z-index: 1;
    transition-duration: 0.2s;
    transition-property: background-color;

    & > * {
        transform: rotate(180deg);
    }

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

`;

const TimePlayed = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    & > p {
        font-size: var(--font-size);
        font-weight: 700;
        color: #fff;
        opacity: 0.5;
        margin: 0;
        white-space: nowrap;

        &:last-child{
            font-size: calc(var(--font-size) * 1.2);
            font-weight: 500;
        }
    }
`;

const Last = styled.div`
    flex: 1 0 0;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: var(--decade);
`;

const Container = styled.div`
    width: 100%;
`;  

const Details = styled.div`
    position: absolute;
    bottom: 0;  
    left: 0;
    width: 30%;
`;

const BlurImage = styled.div`
    position: absolute;
    top: 0;  
    left: 0;
    width: 100%;
    height: 130%;  
    background-image: url(${(props: any) => props.$image});
    background-size: cover;
    background-position: center center;
    filter: blur(40vh);
    opacity: 0.3;
`;

const Title = styled.div`
    font-size: calc(var(--decade) * 3.5) ;
    font-weight: bold;
    color: #FFF;
    margin-bottom: calc(var(--decade) * 0.6) ;
`;

const Description = styled.div`
    font-size: var(--font-size);
    color: #FFF;
    margin-bottom: calc(var(--quintet) * 2.5) ;
`;

const Button = styled.div`
    padding: calc(var(--quintet) * 2.5)  calc(var(--quintet) * 2.5) ;
    background-color: rgba(5, 255, 0, 0.54);
    ${(props: any) => props.$running && 'background-color: rgba(255, 0, 0, 0.54);'}
    ${(props: any) => props.$loading && 'background-color: rgba(255, 255, 255, 0.54);'}
    color: #fff;
    font-size: calc(var(--quintet) * 2.5) ;
    font-weight: bold;
    border-radius: var(--small-radius);
    cursor: pointer;
    margin-bottom: calc(var(--decade) * 0.6) ;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const MaskHorizontal = styled.div`
    position: absolute;
    right: calc(var(--padding) * -1);
    top: calc(50% + var(--quintet) * 3);
    width: 85%;
    height: calc(120%);
    transform: translateY(-50%);
    & > div {
        position: relative;
        width: 100%;
        height: 100%;
        mask-image: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 2%, #FFF 25.81%, #FFF 60.92%, rgba(255, 255, 255, 0.00) 100%);
        -webkit-mask-image: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 2%, #FFF 25.81%, #FFF 60.92%, rgba(255, 255, 255, 0.00) 100%);
    }
`;

const BannerImage = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${(props: any) => props.$image});
    background-size: cover;
    background-position: center center;
    mask-image: linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, #FFF 45%, #FFF 100%);
    -webkit-mask-image: linear-gradient(90deg, rgba(255, 255, 255, 0.00) 0%, #FFF 45%, #FFF 100%);
`;

const Banner = styled.div`
    width: 100%;
    height: 65vh;
    position: relative;
    margin-bottom: calc(var(--decade) * 3.5);
`;