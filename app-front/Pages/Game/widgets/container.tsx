import styled from "styled-components";


const Container = styled.div`
    width: 100%;
    height: max-content;
    display: flex;
    flex-direction: column;
    padding: calc(var(--decade) * 1);
    gap: calc(var(--quintet) * 1);
    box-sizing: border-box;
    border-radius: var(--radius);
    background-color: rgba(255, 255, 255, 0.1);

    & > h2 {
        font-size: calc(var(--font-size) * 1.3);
        margin: 0;
        margin-bottom: var(--quintet);
    }
`;

export { Container };