import { Service } from "../service";
import { Game } from "../Storage/abstract";

export default class AbstractScanner extends Service {

    async scrapGame(_game: Partial<Game>): Promise<Game> {
        return null;
    }
}