import Avatar from '@Components/Avatar';
import Button from '@Components/Button';
import Icon from '@Components/Icon';
import styled from 'styled-components';

export default function Entry({
    id = null,
    type = null,
    title,
    description,
    image = null,
    date = null,
    action,
    sender = null,
    height = null,
    special = false,
    open = false,
    children = null,
}) {

    if(!children) children = (
        <>
            <Button>
                <Icon name="thumbs-up" />
            </Button>
            <Button>
                <Icon name="thumbs-down" />
            </Button>
        </>
    );

    console.log("Entry", id, open, sender)
    return (
        <EntryContainer
            $hasImage={!!image}
            $height={height}
            $special={special}
            onClick={action}
            $open={open}
            style={id ? {
                viewTransitionName: "entry"+id,
            } : {}}
        >
            {special && <ImageBackground
                $image={image}
            />}

            {image && !open && <EntryImage
                className="focusable"
                $image={image}
                $special={special}
            />}
            <EntryDetails>
                {type && <EntryType>
                    {type?.toUpperCase?.()}
                </EntryType>}
                {date && <EntryDate>
                    {date}
                </EntryDate>}
                { sender ? 
                    <EntryHead>
                        <Avatar
                            scale="calc(var(--decade) * 3)"
                            radius="--mini-radius"
                            profile={sender}
                        />
                        <Vert>
                            <EntryTitle> {title} </EntryTitle>
                            <Sender> {sender?.username || "Unknown player"} </Sender>
                        </Vert>
                    </EntryHead> : 
                    <EntryTitle>
                        {title}
                    </EntryTitle>
                }
                <EntryDescription>
                    {description}
                </EntryDescription>
                <Reactions>
                    { children }
                </Reactions>
            </EntryDetails>
            {image && open && <BigImage
                className="focusable"
                src={image}
            />}
        </EntryContainer>
    )
}

const Reactions = styled.div`
    display: flex;
    justify-content: end;
    flex-direction: row;
    gap: calc(var(--decade) * 0.6);
`;

const ImageBackground = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url(${(props: any) => props.$image});
    background-size: cover;
    border-radius: var(--radius);
    background-position: center center;
    filter: blur(1vh);
    opacity: 0.8;
`;

const Vert = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Sender = styled.div`
    font-size: calc(var(--font-size) * 0.8);
    font-weight: 700;
    color: #FFF;
    opacity: 0.5;
`;

const EntryHead = styled.div`
    display: flex;
    flex-direction: row;
    gap: var(--decade);
    align-items: center;
`;

const EntryContainer = styled.div`
    position: relative;
    cursor: pointer;
    width: 100%;
    height: ${(props: any) => (props.$height ? props.$height : (props.$hasImage ? "calc(var(--decade) * 25)" : "max-content"))};
    display: flex;
    flex-direction: ${(props: any) => props.$open ? "column" : "row"};
    padding: calc(var(--decade) * 1);
    gap: calc(var(--decade) * 1);
    box-sizing: border-box;
    border-radius: var(--radius);
    background-color: ${(props: any) => props.$special ? "color-mix(in srgb, var(--main), transparent 80%)" : "rgba(255, 255, 255, 0.1)"};
    overflow: hidden;

    &:hover {
        ${(props: any) => props.$special ? "" : "box-shadow: 0px 0px 0px 0.2vh rgba(255, 255, 255, 0.1);"}
    }
`;

const EntryImage = styled.div`
    width: ${(props: any) => props.$special ? "30%" : "50%"};
    height: 100%;
    position: relative;
    background-image: url(${(props: any) => props.$image});
    background-size: cover;
    background-position: center center;
    border-radius: calc(var(--radius) - var(--decade));
`;

const BigImage = styled.img`
    width: 100%;
    height: auto;
    max-height: calc(var(--decade) * 40);
    position: relative;
    object-fit: cover;
    object-position: center center;
    border-radius: calc(var(--radius) - var(--decade));
`;

const EntryDetails = styled.div`
    flex: 1 0 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: calc(var(--decade) * 0.6);
    box-sizing: border-box;
    position: relative;
`;

const EntryType = styled.div`
    font-size: var(--font-size);
    font-weight: 800;
    color: #FFF;
    opacity: 1;
    position: absolute;
    top: 0;
    right: calc(var(--decade) * 0.6);
`;

const EntryDate = styled.div`
    font-size: calc(var(--font-size) * 0.7);
    font-weight: 700;
    color: #FFF;
    opacity: 0.5;
    position: absolute;
    top: calc(var(--quintet) * 2.8);
    right: calc(var(--decade) * 0.6);
`;

const EntryTitle = styled.div`
    font-size: calc(var(--font-size) * 1.4);
    font-weight: bold;
    color: #FFF;
`;

const EntryDescription = styled.div`
    font-size: var(--font-size);
    flex: 1;
    width: 80%;
    color: #FFF;
    opacity: 0.5;
`;