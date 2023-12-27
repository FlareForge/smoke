import styled from "styled-components";

export default ({ name}) => {
    return (
        <Container className={"icon"}>
            <img height="100%" className="icon" src={name.includes('.') ? name : `./svgs/${name}.svg`} alt={name} />
        </Container>
    );
};

const Container = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    aspect-ratio: 1/1;

    & > img {
        height: 100%;
        aspect-ratio: 1/1;
        object-fit: contain;
    }
`;
