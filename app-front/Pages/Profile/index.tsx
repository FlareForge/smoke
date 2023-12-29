import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import HeadBar from "../../Components/HeadBar";
import { useSettingsMenu } from "@Components/Settings";

export default function Profile() {
    let { id } = useParams();
    const [profileData, setProfileData] = useState(null);
    const [_page, setPage] = useState('posts');
    const { openSettings } = useSettingsMenu();

    useEffect(() => {
        if(!id) window.app.Services.Account.getUserData('token').then((data) => { setProfileData(data) });
        else window.app.Services.Account.getProfileData(id).then((data) => { setProfileData(data) });
    }, []);

    const content = <h2>No data available yet</h2>;
    return (
        <Container>
            <Banner>
                <BlurImage
                    $image={profileData?.avatar}
                />
                <MaskHorizontal>
                    <div>
                        <BannerImage
                            $image={profileData?.avatar}
                        />
                    </div>
                    
                </MaskHorizontal>
                <Details>
                    <AvatarProfile
                        src={profileData?.avatar}
                    />
                    <Title>
                        {profileData?.username || 'Unknown'}
                    </Title>
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
                    <p>Achievements</p>
                </div>
                <div
                    className="soon"
                >
                    <p>Inventory</p>
                </div>
                <div
                    className="soon"
                >
                    <p>Games</p>
                </div>
                {!id && <div
                    className="focusable"
                    onClick={() => openSettings("account")}
                >
                    <p>Settings</p>
                </div>}
            </HeadBar>
            { content }
        </Container>
    );
}

const AvatarProfile = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 28px;
    margin-bottom: 20px;
    object-fit: cover;
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
    filter: blur(300px);
    opacity: 0.3;
`;

const Title = styled.div`
    font-size: 50px;
    font-weight: bold;
    color: #FFF;
    margin-bottom: 10px;
`;

const MaskHorizontal = styled.div`
    position: absolute;
    right: -50px;
    top: calc(50% + 25px);
    width: 85%;
    height: calc(100% + 250px);
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
    /* -webkit-mask-mode: alpha, luminance; */
`;

const Banner = styled.div`
    width: 100%;
    height: 400px;
    position: relative;
`;