import styled from "styled-components";

export default ({ name}) => {
    return (
        <Container className={"icon"}>
            <img height="100%" width="100%" className="icon" src={name.includes('.') ? name : `./svgs/${name}.svg`} alt={name} />
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    aspect-ratio: 1/1;

    & > img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;
