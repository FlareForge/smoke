import styled from 'styled-components';

const Input = styled.input`
    border: 0;
    border-radius: var(--small-radius);
    padding: calc(var(--decade));
    font-size: var(--font-size);
    height: calc(var(--decade) * 3);
    width: 100%;
    height: calc(var(--decade) * 4);
    box-sizing: border-box;
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

export default Input;