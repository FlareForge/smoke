import { Service } from "../service";

export default class AbstractController extends Service {

    async startMapping(){
        return null;
    }

    async stopMapping(){
        return null;
    }

    async loadMapping(_mapping: any){
        return null;
    }

    async detectInput(_callback: (input: string) => void){
        return null;
    }
}