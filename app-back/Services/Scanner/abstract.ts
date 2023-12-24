import { Service } from "../service";
import { Game } from "../Storage/abstract";

export default class AbstractScanner extends Service {

    async scanGames(_callback: (game: Partial<Game>) => void){}

    async selectGame(): Promise<Partial<Game>> {
        return null;
    }
}