import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Icon from '@Components/Icon';
import { useModal } from '@Components/Modal';
import Input from '@Components/Input';
import Button from '@Components/Button';

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

    useEffect(() => {
        updateFriends()
        const interval = setInterval(updateFriends, 3000);
        return () => { clearInterval(interval) }
    }, []);

    const updateFriends = () => {
        window.app.Services.Friends.getFriends().then((friends) => {
            setFriends(friends);
        });
    }

    return (
        <FriendsContainer
            $size={size}
            $friendsVisible={friendsVisible}
        >
            <CloseFriends
                $friendsVisible={friendsVisible}
                onClick={() => setFriendsVisible(!friendsVisible)}
            >
                <Icon name="arrow-right"/>
            </CloseFriends>
            {friends.map((friend,i) => (
                <FriendAvatar
                    key={i}
                    $image={friend.avatar}
                />
            ))}
            <AddFriend
                onClick={() => openModal(() => AddFiendModal, {}, () => {}, {x: '350px', y: '200px'})}
            >
                <Icon name="plus"/>
            </AddFriend>
        </FriendsContainer>
    )
}

const CloseFriends = styled.div`
    position: absolute;
    cursor: pointer;
    z-index: 1;
    padding: 5px;
    box-sizing: border-box;
    top: 40px;
    right: 100%;
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

const FriendsContainer = styled.div`
    transition-duration: 0.2s;
    transition-property: width, padding;
    background-color: var(--grey);
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: ${(props: any) => props.$friendsVisible ? props.$size : '0px'};
    height: 100%;
    border-left: ${(props: any) => props.$friendsVisible ? '1px solid rgba(255, 255, 255, 0.1)' : '0px'};
    box-sizing: border-box; 
    padding: ${(props: any) => props.$friendsVisible ? '10px 10px' : '10px 0px'};

    & > *:not(:first-child) {
        opacity: ${(props: any) => props.$friendsVisible ? '1' : '0'};
        transition-duration: 0.2s;
        transition-property: opacity;
    }
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