import styled from 'styled-components';

export default function HeadBar({ children, drop = "revert"}) {
    return (
        <Bar
            $drop={drop}
            style={{ viewTransitionName: 'headbar' }}
        >
            {children}
        </Bar>
    )
}

const Bar = styled.div`
    margin-top: 50px;
    /* position: relative; */
    width: 100%;
    height: 87px;
    background-color: #fff;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 20px 50px;
    gap: 50px;
    box-sizing: border-box;
    border-radius: 28px;
    background: rgba(255, 255, 255, 0.10);
    z-index: 1;
    overflow: hidden;

    backdrop-filter: ${(props: any) => props.$drop};
    
    & > div{
        position: relative;
        cursor: pointer;
        font-size: 20px;
        font-weight: 700;
        opacity: 0.5;
        color: #fff;
    }

    & > div:not(:last-child)::after{
        content: '';
        position: absolute;
        opacity: 0.1;
        right: -25px;
        top: 0;
        height: 100%;
        width: 2px;
        border-radius: 2px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0.79%, #FFF 57.69%, rgba(255, 255, 255, 0.00) 99.21%);
    }
`;