import { BASE_STORE, BASE_URL, anonKey } from "../smoke.config";
import AbstractFeed from "./abstract";
const { ipcRenderer } = require("electron");

const fetch = async (url, data, token = null): Promise<any> => {
    return await ipcRenderer.invoke('fetch',{
        url: `${BASE_URL}${url}`,
        options: {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token || anonKey}`,
                ...(token ? { "apiKey": anonKey } : {})
            },
            body: JSON.stringify(data || {}	)
        },
        result: 'json'
    })
}

export default class SmokeFeed extends AbstractFeed {

    async getGameInformation(game) {
        if(!game.smoke_id) return {};
        // const token = await ipcRenderer.invoke('get-session-storage', 'smoke-token');
        // const result = await fetch(`/game-info`, { id: game.smoke_id }, token);
        // return result;
        return {
            mods: [
                {
                    id: '1',
                    type: 'mod',
                    title: 'Game Patch 4',
                    description: 'This is the first update for the game',
                    date: '2021-07-01',
                    image: 'smokedata://images/sc8d2v.jpg'
                },
                {
                    id: '2',
                    type: 'mod',
                    title: 'Another post',
                    description: 'This post has no image',
                    sender: {
                        avatar: 'smokedata://images/sc8d2v.jpg',
                        username: 'username',
                    },
                },
                {
                    id: '3',
                    type: 'mod',
                    title: 'Game Patch 4',
                    description: 'This is the first update for the game',
                    date: '2021-07-01',
                    image: 'smokedata://images/sc8d2v.jpg'
                },
                {
                    id: '4',
                    type: 'mod',
                    title: 'Another post',
                    description: 'This post has no image',
                    sender: {
                        avatar: 'smokedata://images/sc8d2v.jpg',
                        username: 'username',
                    },
                },
                {
                    id: '5',
                    type: 'mod',
                    title: 'Game Patch 4',
                    description: 'This is the first update for the game',
                    date: '2021-07-01',
                    image: 'smokedata://images/sc8d2v.jpg'
                },
                {
                    id: '6',
                    type: 'mod',
                    title: 'Another post',
                    description: 'This post has no image',
                    sender: {
                        avatar: 'smokedata://images/sc8d2v.jpg',
                        username: 'username',
                    },
                },
            ],
            servers: [
                {
                    id: '1',
                    type: 'server',
                    title: 'Game Patch 4',
                    description: 'This is the first update for the game',
                    date: '2021-07-01',
                    image: 'smokedata://images/sc8d2v.jpg'
                },
                {
                    id: '2',
                    type: 'server',
                    title: 'Another post',
                    description: 'This post has no image',
                    image: 'smokedata://images/sc8d2v.jpg'
                },
                {
                    id: '3',
                    type: 'server',
                    title: 'Game Patch 4',
                    description: 'This is the first update for the game',
                    date: '2021-07-01',
                    image: 'smokedata://images/sc8d2v.jpg'
                },
                {
                    id: '4',
                    type: 'server',
                    title: 'Another post',
                    description: 'This post has no image',
                    image: 'smokedata://images/sc8d2v.jpg'
                },
                {
                    id: '5',
                    type: 'server',
                    title: 'Game Patch 4',
                    description: 'This is the first update for the game',
                    date: '2021-07-01',
                    image: 'smokedata://images/sc8d2v.jpg'
                },
                {
                    id: '6',
                    type: 'server',
                    title: 'Another post',
                    description: 'This post has no image',
                    image: 'smokedata://images/sc8d2v.jpg'
                }
            ],
            competitions: [
                {
                    id: '1',
                    type: 'tournament',
                    title: 'Game Patch 4',
                    description: 'This is the first update for the game',
                    date: '2021-07-01',
                    image: 'smokedata://images/sc8d2v.jpg'
                },
                {
                    id: '2',
                    type: 'tournament',
                    title: 'Another post',
                    description: 'This post has no image',
                    image: 'smokedata://images/sc8d2v.jpg'
                },
                {
                    id: '3',
                    type: 'tournament',
                    title: 'Game Patch 4',
                    description: 'This is the first update for the game',
                    date: '2021-07-01',
                    image: 'smokedata://images/sc8d2v.jpg'
                },
                {
                    id: '4',
                    type: 'tournament',
                    title: 'Another post',
                    description: 'This post has no image',
                    image: 'smokedata://images/sc8d2v.jpg'
                },
                {
                    id: '5',
                    type: 'tournament',
                    title: 'Game Patch 4',
                    description: 'This is the first update for the game',
                    date: '2021-07-01',
                    image: 'smokedata://images/sc8d2v.jpg'
                },
                {
                    id: '6',
                    type: 'tournament',
                    title: 'Another post',
                    description: 'This post has no image',
                    image: 'smokedata://images/sc8d2v.jpg'
                }
            ],
            posts: [
                {
                    id: '1',
                    type: 'post',
                    title: 'Game Patch 1',
                    description: 'This is the first update for the game',
                    date: '2021-07-01',
                    image: 'smokedata://images/sc8d2v.jpg'
                },
                {
                    id: '2',
                    type: 'post',
                    title: 'Another post',
                    sender: {
                        avatar: 'smokedata://images/sc8d2v.jpg',
                        username: 'username',
                    },
                    description: 'This post has no image',
                },
                {
                    id: '3',
                    type: 'post',
                    title: 'User Post',
                    description: 'This is a user post',
                    date: '2021-07-01',
                    sender: {
                        avatar: 'smokedata://images/sc8d2v.jpg',
                        username: 'username',
                    },
                    image: 'smokedata://images/sc8d2v.jpg'
                },
                {
                    id: '4',
                    type: 'post',
                    title: 'Game Patch 3',
                    description: 'This is the first update for the game',
                    date: '2021-07-01',
                    image: 'smokedata://images/sc8d2v.jpg'
                },
                {
                    id: '5',
                    type: 'post',
                    title: 'Another post',
                    description: 'This post has no image',
                    sender: {
                        avatar: 'smokedata://images/sc8d2v.jpg',
                        username: 'username',
                    },
                },
                {   
                    id: '6',
                    type: 'post',
                    title: 'Game Patch 4',
                    description: 'This is the first update for the game',
                    date: '2021-07-01',
                    image: 'smokedata://images/sc8d2v.jpg'
                },
                {
                    id: '7',
                    type: 'post',
                    title: 'Game Patch 5',
                    description: 'This is the first update for the game',
                    date: '2021-07-01',
                    image: 'smokedata://images/sc8d2v.jpg'
                },
            ],
            wiki: {
                "Gameplay": [
                    {
                        title: "Introduction to gameplay",
                        content: "This is the introduction"
                    },
                    {
                        title: "How to play",
                        content: "This is how to play"
                    }
                ],
                "Story": [
                    {
                        title: "Introduction to story",
                        content: "This is the introduction"
                    },
                    {
                        title: "How to play",
                        content: "This is how to play"
                    }
                ],
                "Characters": [
                    {
                        title: "Introduction to characters",
                        content: "This is the introduction"
                    },
                    {
                        title: "How to play",
                        content: "This is how to play"
                    }
                ],
                "Locations": [
                    {
                        title: "Introduction to locations",
                        content: "This is the introduction"
                    },
                    {
                        title: "How to play",
                        content: "This is how to play"
                    }
                ],
                "Items": [
                    {
                        title: "Introduction to items",
                        content: "This is the introduction"
                    },
                    {
                        title: "How to play",
                        content: "This is how to play"
                    }
                ],
                "Enemies": [
                    {
                        title: "Introduction to enemies",
                        content: "This is the introduction"
                    },
                    {
                        title: "How to play",
                        content: "This is how to play"
                    }
                ],
                "Weapons": [
                    {
                        title: "Introduction to weapons",
                        content: "This is the introduction"
                    },
                    {
                        title: "How to play",
                        content: "This is how to play"
                    }
                ],
                "Armor": [
                    {
                        title: "Introduction to armor",
                        content: "This is the introduction"
                    },
                    {
                        title: "How to play",
                        content: "This is how to play"
                    }
                ],
                "Skills": [
                    {
                        title: "Introduction to skills",
                        content: "This is the introduction"
                    },
                    {
                        title: "How to play",
                        content: "This is how to play"
                    }
                ],
            }
        }
    }
}