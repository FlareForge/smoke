import AbstractController from "./abstract";
import { binHello } from "../../binaries";

export default class WindowsController extends AbstractController {
    
    async init(){
        console.info(binHello())
    }

    async setCallback(_callback: Function){
    }

    async callbackWrapper(_data){
    }

    async clean() {
    }

}