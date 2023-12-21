import { Service } from "../abstract";

export default class AbstractController extends Service {

    async setCallback(_callback: Function){
        return null;
    }
}