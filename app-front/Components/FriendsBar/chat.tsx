import Button from '@Components/Button';
import Icon from '@Components/Icon';
import Input from '@Components/Input';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

export default function Chat ({ user }) {

    const containerRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const [unconfirmedMessages, setUnconfirmedMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        return () => {
            window.app.Services.Messages.setCallback(null, null);
        }
    }, []);

    useEffect(() => {
        if(containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, [messages]);

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

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') sendMessage();
    }

    const sendMessage = () => {
        window.app.Services.Messages.sendPrivateMessage(user, newMessage);
        setNewMessage('');
        setUnconfirmedMessages((prev) => [...prev, { content: newMessage, isMine: true }]);
    }

    return (
        <>
            <MessagesContainer ref={containerRef}>
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
                    onKeyDown={handleKeyDown}
                    className="focusable"
                />
                <Button
                    className="focusable"
                    onClick={sendMessage}
                >
                    <Icon name="arrow-right"/>
                </Button>
            </SendMessage>

        </>
    )

}   

const SendMessage = styled.div`
    display: flex;
    gap: var(--quintet);
    padding: var(--quintet);
    box-sizing: border-box;
    border-top: var(--unit) solid rgba(255, 255, 255, 0.1);
    & > *:last-child {
        width: calc(var(--decade) * 4);
    }
`;

const MessagesContainer = styled.div`
    height: 100%;
    width: 100%;
    overflow-y: auto;
    padding: var(--quintet);
    display: flex;
    flex-direction: column;
    gap: var(--quintet);
    box-sizing: border-box;
`;

const Message = styled.div`
    padding: var(--quintet) var(--decade);
    border-radius: ${(props: any) => props.$isMine ? 'var(--small-radius) 0 var(--small-radius) var(--small-radius)' : '0 var(--small-radius) var(--small-radius) var(--small-radius)'};
    background: ${(props: any) => props.$isMine ? 'var(--main)' : 'rgba(255, 255, 255, 0.1)'};
    color: #fff;
    align-self: ${(props: any) => props.$isMine ? 'flex-end' : 'flex-start'};
    max-width: 80%;
    word-break: break-word;

    & > div {
        font-size: var(--font-size);
    }
`;