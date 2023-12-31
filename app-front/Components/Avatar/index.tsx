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
            src={avatar}
            ref={ref}
            $scale={scale}
            $radius={radius}
            $online={online}
            onClick={onClick || (() => {
                transition('/profile/'+id);
            })}
        />
    );
});

const AvatarImg = styled.img`
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
    border: ${(props: any) => props.$online ? "calc(var(--unit) * 3) solid green" : 'revert'};
    filter: ${(props: any) => !props.$online ? "grayscale(1)" : 'revert'};
    transition-duration: 0.2s;
    transition-property: border-radius, opacity, filter;

    &:hover {
        border-radius: calc(var(${(props: any) => props.$radius}) - var(--quintet));
    }
`;