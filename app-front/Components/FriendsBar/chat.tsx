import Button from '@Components/Button';
import Icon from '@Components/Icon';
import Input from '@Components/Input';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function Chat ({ user }) {

    const [messages, setMessages] = useState([]);
    const [unconfirmedMessages, setUnconfirmedMessages] = useState([]); // [{content, isMine}
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        return () => {
            window.app.Services.Messages.setCallback(null, null);
        }
    }, []);

    useEffect(() => {
        if(user) {
            window.app.Services.Messages.getPrivateMessages(user).then((_messages) => {
                setMessages(_messages);
                window.app.Services.Messages.setCallback(user, (_messages) => {
                    setMessages((prev) => {
                        const fullMessages = [...prev, ..._messages];
                        const messages = [];
                        const idSeen = {};
                        for(let message of fullMessages) {
                            if(idSeen[message.id]) continue;
                            messages.push(message);
                            idSeen[message.id] = true;
                        }
                        messages.sort((a, b) => (new Date(a.date) as any) - (new Date(b.date) as any));
                        return messages; 
                    });
                    setUnconfirmedMessages([]);
                });
            });
        } else {
            setMessages([]);
            window.app.Services.Messages.setCallback(null, null);
        }
    }, [user]);

    return (
        <>
            <MessagesContainer>
                {(messages || [])?.map((message, i) => (
                    <Message
                        key={i}
                        $isMine={message.isMine}
                    >
                        <div>
                            {message.content}
                        </div>
                    </Message>
                ))}
                {(unconfirmedMessages || [])?.map((message, i) => (
                    <Message
                        key={i}
                        $isMine={message.isMine}
                    >
                        <div>
                            {message.content}
                        </div>
                    </Message>
                ))}
            </MessagesContainer>
            <SendMessage>
                <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Message"
                />
                <Button
                    onClick={() => {
                        window.app.Services.Messages.sendPrivateMessage(user, newMessage);
                        setNewMessage('');
                        setUnconfirmedMessages((prev) => [...prev, { content: newMessage, isMine: true }]);
                    }}
                >
                    <Icon name="arrow-right"/>
                </Button>
            </SendMessage>

        </>
    )

}   

const SendMessage = styled.div`
    display: flex;
    gap: 10px;
    padding: 10px;
    box-sizing: border-box;

    & > *:last-child {
        width: 50px;
    }
`;

const MessagesContainer = styled.div`
    height: 100%;
    width: 100%;
    overflow-y: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-sizing: border-box;
`;

const Message = styled.div`
    padding: 10px;
    border-radius: ${(props: any) => props.$isMine ? '10px 0px 10px 10px' : '0px 10px 10px 10px'};
    background: ${(props: any) => props.$isMine ? 'var(--main)' : 'rgba(255, 255, 255, 0.1)'};
    color: #fff;
    align-self: ${(props: any) => props.$isMine ? 'flex-end' : 'flex-start'};
    max-width: 80%;
    word-break: break-word;
`;