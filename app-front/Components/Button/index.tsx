import styled from 'styled-components';

const Button = styled.div`
    border: 0px;
    cursor: pointer;
    border-radius: 18px;
    padding: 10px;
    font-size: 17px;
    width: 100%;
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