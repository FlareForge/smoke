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
export default function FriendsBar({size = '80px'}){

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
            $size={size}
            $friendsVisible={friendsVisible}
        >
            <CloseFriends
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
                        onClick={() => {
                            setSelectedFriend(friend);
                        }}
                    />
                ))}
                <AddFriend
                    onClick={() => openModal(() => AddFiendModal, {}, () => {}, {x: '350px', y: '200px'})}
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
    height: 500px;
    background-color: rgba(255, 255, 255, 0.05);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const Username = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: white;
`;

const Avatar = styled.div`
    width: 50px;
    height: 50px;
    background-image: url(${(props: any) => props.$image});
    background-size: cover;
    background-position: center;
    border-radius: 18px;
    cursor: pointer;
`;

const Miniprofile = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    box-sizing: border-box;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    gap: 10px;

    & > *:last-child {
        width: 50px;
    }
`;

const FriendsContainer = styled.div`
    transition-duration: 0.2s;
    transition-property: width, padding;
    background-color: var(--grey);
    position: relative;
    flex-direction: column;
    gap: 10px;
    width: ${(props: any) => props.$friendsVisible ? props.$size : '0px'};
    display: flex;
    height: 100%;
    border-left: ${(props: any) => props.$friendsVisible ? '1px solid rgba(255, 255, 255, 0.1)' : '0px'};
    box-sizing: border-box; 
    padding: ${(props: any) => props.$friendsVisible ? '10px 10px' : '10px 0px'};
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
    gap: 10px;
    width: ${(props: any) => props.$chatOpen ? '350px' : '0px'};
    height: 100%;
    border-left: ${(props: any) => props.$chatOpen ? '1px solid rgba(255, 255, 255, 0.1)' : '0px'};
    box-sizing: border-box; 
`;

const CloseFriends = styled.div`
    position: absolute;
    cursor: pointer;
    z-index: 1;
    padding: 5px;
    box-sizing: border-box;
    top: 40px;
    left: -28px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px 0px 0px 10px;
    background-color: var(--grey);
    border: 1px solid rgba(255, 255, 255, 0.1);

    & > * {
        transform: ${(props: any) => !props.$friendsVisible ? 'rotate(180deg)' : 'revert'};
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
    height: 60px;
    background-image: url(${(props: any) => props.$image});
    background-size: cover;
    background-position: center;
    border-radius: 18px;
    cursor: pointer;
`;

const AddFriend = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 18px;
    cursor: pointer;
`;