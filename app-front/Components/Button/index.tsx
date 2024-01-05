import styled from 'styled-components';

const Button = styled.div`
    border: 0;
    font-weight: 600;
    cursor: pointer;
    border-radius: var(--small-radius);
    padding: calc(var(--decade));
    font-size: var(--font-size);
    width: max-content;
    height: calc(var(--decade) * 4);
    box-sizing: border-box;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.1);
    &:focus {
        outline: none;
        background-color: rgba(255, 255, 255, 0.2);
    }
    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    color: #fff;
`;

export default Button;