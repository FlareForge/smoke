import styled from 'styled-components';

export default function Loader({size = '80px'}){
    return (
        <LoaderContainer
            $size={size}
        >
            <div></div><div></div><div></div><div></div>
        </LoaderContainer>
    )
}

const LoaderContainer = styled.div`
    display: inline-block;
    position: relative;
    width: ${(props: any) => props.$size};
    height: ${(props: any) => props.$size};

    & div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: ${(props: any) => props.$size};
        height: ${(props: any) => props.$size};
        border: 4px solid #fff;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #fff transparent transparent transparent;
    }

    & div:nth-child(1) {
        animation-delay: -0.45s;
    }

    & div:nth-child(2) {
        animation-delay: -0.3s;
    }

    & div:nth-child(3) {
        animation-delay: -0.15s;
    }

    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;
