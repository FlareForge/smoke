import { Service } from "../service";

export default class AbstractFeed extends Service {

    async getGameInformation(_game: any): Promise<any> {
        return {};
    }
}