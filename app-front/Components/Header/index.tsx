import { styled } from "styled-components";
import Menu from "./Menu";
import Account from "./Account";

export default ({ fullscreen = false, icon = null, action = null }) => {

    return (
        <HeaderContainer $fullscreen={fullscreen}>
            <BackDrop />
            <Menu />
            <Account
                icon={icon}
                action={action}
            />
        </HeaderContainer>
    );
};

const HeaderContainer = styled.div`
    padding: 20px var(--padding);
    box-sizing: border-box;
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    position: absolute;
    top: ${(props: any) => (props.$fullscreen ? "0" : "31px")};
`;

const BackDrop = styled.div`
    position: absolute;
    width: calc(100% + 50px);
    left: -50px;
    height: 100%;
    backdrop-filter: blur(100px);
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.8) 30%,
        rgba(0, 0, 0, 0.0001) 100%
    );
    mask-image: linear-gradient(
        180deg,
        #000000 50%,
        rgba(0, 0, 0, 0.0001) 100%
    );
    -webkit-mask-image: linear-gradient(
        180deg,
        #000000 50%,
        rgba(0, 0, 0, 0.0001) 100%
    );
`;