import styled from 'styled-components';

const Input = styled.input`
    border: 0px;
    border-radius: 18px;
    padding: 10px;
    font-size: 17px;
    height: 45px;
    width: 100%;
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