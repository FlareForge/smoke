import Loader from '@Components/Loader';
import { useState } from 'react';
import styled from 'styled-components';

export default function Button({onClick = null, children = null, ...props}) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    return (
        <ButtonContainer
            {...props}
            $loading={isLoading || error}
            onClick={async (e) => {
                setIsLoading(true);
                try{
                    if(onClick) await Promise.resolve(onClick(e));
                }catch(e){
                    console.error(e);
                    setError(e);
                    setTimeout(() => setError(null), 2000);
                }
                await new Promise((resolve) => setTimeout(resolve, 500));
                setIsLoading(false);
            }}
        >
            <div>{children}</div>
            {isLoading && !error && <Loader size='calc(var(--decade) * 2)'/>}
            {error && <div className="loader">Error!</div>}
        </ButtonContainer>
    )
}

const ButtonContainer = styled.div`
    cursor: pointer;
    width: max-content;
    height: calc(var(--decade) * 4);
    padding: calc(var(--decade));
    box-sizing: border-box;
    color: #fff;
    font-size: var(--font-size);
    font-weight: 600;
    text-align: center;
    border-radius: var(--small-radius);
    border: 0;
    background-color: rgba(255, 255, 255, 0.1);
    position: relative;
    opacity: ${(props: any) => props.$loading ? 0.5 : 1};

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    &:focus {
        outline: none;
        background-color: rgba(255, 255, 255, 0.2);
    }

    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    &:active {
        background-color: rgba(255, 255, 255, 0.3);
    }

    & > *:not(.loader) {
        opacity: ${(props: any) => props.$loading ? 0 : 1};
    }

    & > .loader {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;