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
`;

const BackDrop = styled.div`
    position: absolute;
    width: 100%;
    left: 0px;
    height: 100%;
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.8) 50%,
        rgba(0, 0, 0, 0.0001) 100%
    );
`;