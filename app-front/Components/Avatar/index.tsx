import useTransition from "@Components/Transition";
import { forwardRef } from "react";
import styled from "styled-components";

const defaultProfile = {
    avatar: "",
    id: "",
    online: false,
};

export default forwardRef<any, any>(function Avatar({
    profile = defaultProfile,
    scale = "calc(var(--decade) * 3.5)",
    radius = '--small-radius',
    className = "",
    onClick = null,
}, ref) {
    const { avatar, id, online } = profile || defaultProfile;

    const transition = useTransition();

    return (
        <AvatarImg
            className={className}
            ref={ref}
            $scale={scale}
            $radius={radius}
            $online={online}
            onClick={onClick || (() => {
                transition('/profile/'+id);
            })}
        >
           {avatar && <img
                src={avatar}
                alt="avatar"
            />}
        </AvatarImg>
    );
});

const AvatarImg = styled.div`
    cursor: pointer;
    position: relative;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.1);
    background-size: cover;
    background-position: center;
    width: ${(props: any) => props.$scale};
    height: ${(props: any) => props.$scale};
    opacity: ${(props: any) => props.$online ? 1 : 0.5};
    border-radius: var(${(props: any) => props.$radius});    
    filter: ${(props: any) => !props.$online ? "grayscale(1)" : 'revert'};
    transition-duration: 0.2s;
    transition-property: box-shadow, opacity, filter;
    box-shadow: 0 0 1vh rgba(0, 0, 0, 0.5);

    & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: var(${(props: any) => props.$radius});
    }
    
    &:hover {
        box-shadow: 0 0 1vh ${(props: any) => props.$online ? "rgba(0, 255, 47, 0.46);" : "rgba(136, 136, 136, 0.46);"};
    }

    &:after {
        content: "";
        display: ${(props: any) => props.$online ? "block" : "none"};
        position: absolute;
        box-sizing: border-box;
        height: 17%;
        width: 17%;
        background-color: green;
        box-shadow: 0 0 0.5vh rgb(85, 255, 0);
        border-radius: var(--radius);
        left: 5%;
        top: 5%;
    }
`;