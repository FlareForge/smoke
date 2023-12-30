import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Icon from '@Components/Icon';
import { useModal } from '@Components/Modal';
import Input from '@Components/Input';
import Button from '@Components/Button';
import Chat from './chat';
import useTransition from '@Components/Transition';

function AddFiendModal ({ closeModal }) {
    const [username, setUsername] = useState('');

    return (
        <div>
            <h1>Add Friend</h1>
            <h2></h2>
            <div>
                <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />
            </div>
            <div>
                <Button onClick={async () => {
                    await window.app.Services.Friends.requestFriend(username);
                    closeModal();
                }}>Add</Button>
            </div>
            <div>
                <button onClick={() => closeModal()}>Cancel</button>
            </div>
        </div>
    )
}
export default function FriendsBar(){

    const { openModal } = useModal();
    const [friendsVisible, setFriendsVisible] = useState(true);
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const transition = useTransition();

    useEffect(() => {
        updateFriends()
        const interval = setInterval(updateFriends, 1000);
        return () => { clearInterval(interval) }
    }, []);

    const updateFriends = () => {
        window.app.Services.Friends.getFriends().then((friends) => {
            setFriends(friends);
        });
    }

    return (
        <SectionContainer
            $friendsVisible={friendsVisible}
        >
            <CloseFriends
                className="focusable"
                $friendsVisible={friendsVisible}
                onClick={() => {
                    if(selectedFriend) {
                        setSelectedFriend(null);
                    } else {
                        setFriendsVisible(!friendsVisible);
                    }
                }}
            >
                <Icon name="arrow-right"/>
            </CloseFriends>
            <ChatContainer
                $chatOpen={!!selectedFriend}
            >
                <Miniprofile>
                    <Avatar
                        $image={selectedFriend?.avatar}
                    />
                    <UserInfo>
                        <Username>
                            {selectedFriend?.username}
                        </Username>
                        <div>
                            {selectedFriend?.status}
                        </div>
                    </UserInfo>
                    <Button
                        className="focusable"
                        onClick={() => {
                            transition('/profile/'+selectedFriend.id);
                        }}
                    >
                        <Icon name="account"/>
                    </Button>
                </Miniprofile>
                {!!selectedFriend && <Chat user={selectedFriend} />}
                <QuickTools />
            </ChatContainer>
            <FriendsContainer
                $friendsVisible={friendsVisible}
            >
                {friends.map((friend,i) => (
                    <FriendAvatar
                        key={i}
                        $image={friend.avatar}
                        className="focusable"
                        onClick={() => {
                            setSelectedFriend(friend);
                        }}
                    />
                ))}
                <AddFriend
                    className="focusable"
                    onClick={() => openModal(() => AddFiendModal, {}, () => {}, {x: '40vh', y: '20vh'})}
                >
                    <Icon name="plus"/>
                </AddFriend>
            </FriendsContainer>
            
        </SectionContainer>
    )
}

const UserInfo = styled.div`
    flex: 1 0 0;
`;

const QuickTools = styled.div`
    width: 100%;
    height: calc(35vh * var(--scale));
    background-color: rgba(255, 255, 255, 0.05);
    border-top: var(--unit) solid rgba(255, 255, 255, 0.1);
`;

const Username = styled.div`
    font-size: calc(var(--quintet) * 2.5);
    font-weight: 600;
    color: white;
`;

const Avatar = styled.div`
    width: calc(var(--decade) * 3.5);
    height: calc(var(--decade) * 3.5);
    background-color: rgba(255, 255, 255, 0.1);
    background-image: url(${(props: any) => props.$image});
    background-size: cover;
    background-position: center;
    border-radius: var(--small-radius);
    cursor: pointer;
`;

const Miniprofile = styled.div`
    width: 100%;
    height: calc(var(--decade) * 5);
    display: flex;
    box-sizing: border-box;
    padding: calc(var(--decade) * 0.6);
    background-color: rgba(255, 255, 255, 0.05);
    border-bottom: var(--unit) solid rgba(255, 255, 255, 0.1);
    gap: calc(var(--decade) * 0.6) ;

    & > *:last-child {
        width: calc(var(--decade) * 3.5);
    }

    
    & > div:last-child {
        width: calc(var(--decade) * 3.5);
        height: calc(var(--decade) * 3.5);
    }
`;

const FriendsContainer = styled.div`
    transition-duration: 0.2s;
    transition-property: width, padding;
    background-color: var(--grey);
    position: relative;
    flex-direction: column;
    gap: calc(var(--decade) * 0.6) ;
    width: ${(props: any) => props.$friendsVisible ? 'calc(var(--decade) * 6)' : '0'};
    display: flex;
    height: 100%;
    border-left: ${(props: any) => props.$friendsVisible ? 'var(--unit) solid rgba(255, 255, 255, 0.1)' : '0'};
    box-sizing: border-box; 
    padding: ${(props: any) => props.$friendsVisible ? 'calc(var(--decade) * 0.6)  calc(var(--decade) * 0.6) ' : 'calc(var(--decade) * 0.6)  0'};
    overflow: hidden;

    & > *:not(:first-child) {
        opacity: ${(props: any) => props.$friendsVisible ? '1' : '0'};
        transition-duration: 0.2s;
        transition-property: opacity;
    }
`;

const ChatContainer = styled.div`
    transition-duration: 0.2s;
    transition-property: width, padding;
    background-color: var(--grey);
    position: relative;
    overflow: hidden;
    flex-direction: column;
    display: flex;
    width: ${(props: any) => props.$chatOpen ? 'calc(var(--decade) * 25) ' : '0'};
    height: 100%;
    border-left: ${(props: any) => props.$chatOpen ? 'var(--unit) solid rgba(255, 255, 255, 0.1)' : '0'};
    box-sizing: border-box; 
`;

const CloseFriends = styled.div`
    position: absolute;
    cursor: pointer;
    z-index: 1;
    padding: calc(var(--unit) * 4);
    box-sizing: border-box;
    top: calc(var(--nav-height));
    left: calc((var(--decade) * -2.5) + var(--unit));
    width: calc(var(--decade) * 2.5);
    height: calc(var(--decade) * 2.5);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: calc(var(--decade) * 0.6)  0 0 calc(var(--decade) * 0.6) ;
    background-color: var(--grey);
    border: var(--unit) solid rgba(255, 255, 255, 0.1);

    & > * {
        transition-duration: 0.2s;
        transition-property: transform;
        transform: ${(props: any) => !props.$friendsVisible ? 'scaleX(-1)' : 'scaleX(1)'};
    }

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;


const SectionContainer = styled.div`
    background-color: var(--grey);
    position: relative;
    display: flex;
    height: 100%;
    box-sizing: border-box; 
`;

const FriendAvatar = styled.div`
    width: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    height: calc(var(--decade) * 4.7);
    background-image: url(${(props: any) => props.$image});
    background-size: cover;
    background-position: center;
    border-radius: var(--small-radius);
    cursor: pointer;
`;

const AddFriend = styled.div`
    width: 100%;
    height: calc(var(--decade) * 4.7);
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: calc(var(--decade) * 0.6) ;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: var(--small-radius);
    cursor: pointer;
`;