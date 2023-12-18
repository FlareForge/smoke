import styled from 'styled-components';

export default function Entry({
    type,
    title,
    description,
    image,
    date,
    action,
}) {

    return (
        <EntryContainer>
            <EntryImage
                className="focusable"
                onClick={action}
                $image={image}
            />
            <EntryDetails>
                <EntryType>
                    {type.toUpperCase()}
                </EntryType>
                <EntryDate>
                    {date}
                </EntryDate>
                <EntryTitle>
                    {title}
                </EntryTitle>
                <EntryDescription>
                    {description}
                </EntryDescription>
            </EntryDetails>
        </EntryContainer>
    )
}

const EntryContainer = styled.div`
    width: 80%;
    height: 400px;
    display: flex;
    padding: 10px;
    gap: 10px;
    box-sizing: border-box;
    border-radius: 28px;
    background-color: rgba(255, 255, 255, 0.1);
`;

const EntryImage = styled.div`
    width: 50%;
    height: 100%;
    background-image: url(${(props: any) => props.$image});
    background-size: cover;
    background-position: center center;
    border-radius: 18px;
`;

const EntryDetails = styled.div`
    flex: 1 0 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-sizing: border-box;
    position: relative;
`;

const EntryType = styled.div`
    font-size: 18px;
    font-weight: 800;
    color: #FFF;
    opacity: 1;
    position: absolute;
    top: 0;
    right: 10px;
`;

const EntryDate = styled.div`
    font-size: 15px;
    font-weight: 700;
    color: #FFF;
    opacity: 0.5;
    position: absolute;
    top: 20px;
    right: 10px;
`;

const EntryTitle = styled.div`
    font-size: 30px;
    font-weight: bold;
    color: #FFF;
`;

const EntryDescription = styled.div`
    font-size: 17px;
    width: 80%;
    color: #FFF;
    opacity: 0.5;
`;