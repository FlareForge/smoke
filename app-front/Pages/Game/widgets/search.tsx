import Button from "@Components/Button";
import { Container } from "./container";
import styled from "styled-components";
import Icon from "@Components/Icon";
import Input from "@Components/Input";
import { useState } from "react";

export default function Search({gameData, feedData}) {

    const [search, setSearch] = useState("");
    const game = gameData;
    const feed = feedData;

    return (
        <Container>
            <Title>Search</Title>
            <Split>
                <Input
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                    onClick={() => {}}
                >
                    <Icon name="arrow-right" />
                </Button>
            </Split>
        </Container>
    )
}

const Title = styled.div`
    margin: 0;
    font-size: calc(var(--font-size) * 1.3);
    font-weight: 600;
`;

const Split = styled.div`
    display: flex;
    flex-direction: row;
    gap: calc(var(--quintet) * 1);
    
    & > *:last-child {
        width: revert;
        aspect-ratio: 1/1;
    }
`;