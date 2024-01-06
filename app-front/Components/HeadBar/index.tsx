import styled from 'styled-components';

export default function HeadBar({ children, drop = "revert", style = {}}) {
    return (
        <Bar
            $drop={drop}
            style={{
                ...style,
                viewTransitionName: 'headbar'
            }}
        >
            {children}
        </Bar>
    )
}

const Bar = styled.div`
    /* position: relative; */
    width: calc(100%);
    height: calc(var(--decade) * 5.5);
    background-color: #fff;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: calc(var(--quintet) * 2.5)  calc(var(--decade) * 3.5);
    gap: calc(var(--decade) * 2);
    box-sizing: border-box;
    border-radius: var(--radius);
    background: rgba(255, 255, 255, 0.10);
    z-index: 1;
    overflow: hidden;

    &::-webkit-scrollbar {
        display: none;
    }

    backdrop-filter: ${(props: any) => props.$drop};
    
    & > div{
        position: relative;
        cursor: pointer;
        font-size: calc(var(--quintet) * 2.5) ;
        font-weight: 700;
        opacity: 0.5;
        color: #fff;
        padding: calc(var(--unit) * 1) calc(var(--decade) * 1.5 / 2);
        border-radius: var(--small-radius);
    }

    & > div:not(:last-child)::after{
        content: '';
        position: absolute;
        opacity: 0.1;
        right: calc(var(--decade) * -1);
        top: 0;
        height: 100%;
        width: var(--unit);
        border-radius: var(--unit);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0.79%, #FFF 57.69%, rgba(255, 255, 255, 0.00) 99.21%);
    }
`;