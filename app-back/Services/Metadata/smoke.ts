import AbstractScanner from "./abstract";

export default class SmokeMetadata extends AbstractScanner {

    async scrapGame(game) {
        // ...
        return {
            ...game,
            image: "",
            banner: "",
            description: "No description yet",
        };
    }

};
